import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secure-jwt-secret";

export async function POST(req) {
  try {
    const { phoneNumber, otp } = await req.json();

    // Check if user exists
    const userRef = doc(db, "users", phoneNumber);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return new Response(
        JSON.stringify({ message: "User not found" }),
        { status: 400 }
      );
    }

    // Validate OTP
    const otpRef = doc(db, "otps", phoneNumber);
    const otpDoc = await getDoc(otpRef);

    if (!otpDoc.exists()) {
      return new Response(
        JSON.stringify({ message: "OTP expired or not found" }),
        { status: 400 }
      );
    }

    const { otp: storedOtp, expiry } = otpDoc.data();


    
    if (String(storedOtp) !== String(otp) || expiry.toMillis() < Date.now()) {
      return new Response(
        JSON.stringify({ message: "Invalid or expired OTP" }),
        { status: 400 }
      );
    }

    // Generate JWT token
    const token = jwt.sign({ phoneNumber }, JWT_SECRET, { expiresIn: "7d" });

    // Remove OTP after successful sign in
    await deleteDoc(otpRef);

    const userData = userDoc.data();
    const response = new Response(
      JSON.stringify({ message: "SignIn successful", user: userData }),
      { status: 200 }
    );
    response.headers.set(
      "Set-Cookie",
      `authToken=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${60 * 60 * 24 * 7}`
    );

    return response;
  } catch (error) {
    console.error("Error during sign in:", error);
    return new Response(
      JSON.stringify({ message: "Failed to sign in" }),
      { status: 500 }
    );
  }
}
