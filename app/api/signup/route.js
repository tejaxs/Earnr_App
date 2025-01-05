import { db } from "@/firebase/firebaseConfig";
import {
  doc,
  setDoc,
  getDoc,
  increment,
  arrayUnion,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secure-jwt-secret";

export async function POST(req) {
  try {
    const { phoneNumber, otp, name, referralBy } = await req.json();
    console.log(phoneNumber,otp,name,referralBy);
    
    // Check if the user already exists in Firebase
    const userRef = doc(db, "users", phoneNumber);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 400,
      });
    }



    // Validate OTP (simplified check)
    const otpRef = doc(db, "otps", phoneNumber);
    const otpDoc = await getDoc(otpRef);

    if (!otpDoc.exists()) {
      return new Response(
        JSON.stringify({ message: "OTP expired or not found" }),
        { status: 400 }
      );
    }

    const { otp: storedOtp, expiry } = otpDoc.data();

    console.log(expiry.toMillis() , Date.now());
    if (String(storedOtp) !== String(otp) || expiry.toMillis() < Date.now()) {
      return new Response(
        JSON.stringify({ message: "Invalid or expired OTP" }),
        { status: 400 }
      );
    }
    

    // Create user in Firebase
    await setDoc(userRef, {
      phoneNumber,
      name,
      uid: phoneNumber,
      followers: 0,
      amount:0,
      coin:0,
      createdAt: new Date().toISOString(),
    });

    if (referralBy) {
      const referrerRef = doc(db, "creators", referralBy);
      const referrerDoc = await getDoc(referrerRef);

      if (referrerDoc.exists()) {
        // If the referrer exists, increment their referral count and add the new user to the referred list
        await updateDoc(referrerRef, {
          referralCount: increment(1),
          referredUsers: arrayUnion(phoneNumber),
        });
      } else {
        return new Response(
          JSON.stringify({ message: "Referrer does not exist" }),
          { status: 400 }
        );
      }
    }

    // Generate JWT token
    const token = jwt.sign({ phoneNumber }, JWT_SECRET, { expiresIn: "7d" });

    // Remove OTP after successful sign up
    await deleteDoc(otpRef);

    const response = new Response(
      JSON.stringify({
        message: "SignUp successful",
        user: { phoneNumber, name, uid: phoneNumber },
      }),
      { status: 200 }
    );
    response.headers.set(
      "Set-Cookie",
      `authToken=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${
        60 * 60 * 24 * 7
      }`
    );

    return response;
  } catch (error) {
    console.error("Error during signup:", error);
    return new Response(JSON.stringify({ message: "Failed to sign up" }), {
      status: 500,
    });
  }
}
