import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secure-jwt-secret";

export async function GET(req) {
  try {
    const authCookie = req.cookies.get("authToken");

    if (!authCookie) {
      return new Response(JSON.stringify({ authenticated: false }), { status: 401 });
    }

    const token = typeof authCookie === "object" ? authCookie.value : authCookie;

    const decoded = jwt.verify(token, JWT_SECRET);

    const userRef = doc(db, "users", decoded.phoneNumber);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return new Response(JSON.stringify({ authenticated: false, message: "User not found" }), { status: 401 });
    }

    const userData = userDoc.data();
    return new Response(
      JSON.stringify({ authenticated: true, user: userData }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error decoding token:", error.message);
    return new Response(JSON.stringify({ authenticated: false }), { status: 401 });
  }
}
