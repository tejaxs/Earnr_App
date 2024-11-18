"use client";
import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "../../firebase/firebaseConfig.jsx";
import { useRouter } from "next/navigation";
import Link from "next/link.js";
import useAuth from "@/hooks/useAuth.jsx";
import { getDoc, setDoc ,doc, increment, arrayUnion, updateDoc} from "firebase/firestore";

const Signup = () => {
  const [name, setName] = useState(""); // State for the user's name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const {user} = useAuth();
  const [loading, setLoading] = useState(true);
  
  const [referralBy, setReferralBy] = useState(null);


  useEffect(() => {
    // Extract referral ID from query params
    const queryParams = new URLSearchParams(window.location.search);
    const referrer = queryParams.get("ref");
   setReferralBy(referrer)
    
  }, [router]);

  
  useEffect(() => {
    if (user) {
      router.push("/v2/home");
    }else {
      setLoading(false); // User is not signed in, stop loading
    }
  }, [user, router]);
  const handleSignUp = async () => {
    try {
      // Create a user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Update the user's profile with the name
      await updateProfile(user, { displayName: name });

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        followers: 0, // Initialize followers count to zero
         // Initialize an empty array for following
      });
  

      if (referralBy) {
        const creatorRef = doc(db, "creators", referralBy);
        await updateDoc(creatorRef, {
          referralCount: increment(1), // Increment referral count
          referredUsers: arrayUnion(user.uid), // Add user ID to the referred users array
        });
      }

      // Send a verification email
      await sendEmailVerification(user);
  
      // Redirect to dashboard after signup
      router.push("/v2/home"); 
  
      // Optionally, show a message to the user to check their email
      setSuccessMessage("Sign up successful! Please check your email for verification.");
    } catch (err) {
      setError("Sign up failed: " + err.message);
    }
  };
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // console.log("ho");
      
      // Check if the user already exists in Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
  
      if (!userDoc.exists()) {
        // User does not exist in Firestore, so add them
        await setDoc(userDocRef, {
          uid: user.uid,
          name: user.displayName || "Anonymous", // Use default if name not available
          email: user.email,
          profilePicture: user.photoURL || null,
          createdAt: new Date(),
        });
      }
  
      if (referralBy) {
        const creatorRef = doc(db, "creators", referralBy);
        await updateDoc(creatorRef, {
          referralCount: increment(1), // Increment referral count
          referredUsers: arrayUnion(user.uid), // Add user ID to the referred users array
        });
      }

      

      // Redirect to home
      router.push("/v2/home");
    } catch (err) {
      setError("Google login failed: " + err.message);
    }
  };
  

  const handleFacebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/v2/home");
    } catch (err) {
      setError("Facebook login failed: " + err.message);
    }
  };

  const handleAppleSignIn = async () => {
    const provider = new OAuthProvider("apple.com");
    try {
      await signInWithPopup(auth, provider);
      router.push("/v2/home");
    } catch (err) {
      setError("Apple login failed: " + err.message);
    }
  };
  // if(user)return router.push("/v2/home");
  return (
    <div className="bg-black w-full h-screen text-white px-3 flex flex-col items-center justify-center gap-5">
      
      <div className="text-center flex flex-col gap-2">
        <h2 className="text-[20px]">Create Account</h2>
        <p>Fill your information below or register
        with your social account</p>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className=" outline-none rounded-3xl px-3 py-1 text-black"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className=" outline-none rounded-3xl px-3 py-1 text-black"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className=" outline-none rounded-3xl px-3 py-1 text-black"
          />
        </div>

        <button
          onClick={handleSignUp}
          className="bg-[#FFCD48] urbanist-700 py-2 px-4 text-center text-black rounded-3xl w-full text-[20px]"
        >
          Sign Up
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="flex items-center gap-2">
        <span>
          <img src="/hoizontalLine.svg" className="w-full" />
        </span>
        <span>Or sign up with</span>
        <span>
          <img src="/hoizontalLine.svg" className="w-full" />
        </span>
      </div>
      <div className="flex gap-4 justify-center">
        <img src="/google.png" onClick={handleGoogleSignIn} className="w-[30px] h-[30px] cursor-pointer" />
        <img src="/facebook.png" onClick={handleFacebookSignIn} className="w-[30px] h-[30px] cursor-pointer" />
        <img src="/apple.png" onClick={handleAppleSignIn} className="w-[30px] h-[30px] cursor-pointer" />
      </div>
      <div className="text-[12px]">
          Already have an account? <Link href={"/login"} className="text-[#FFCD48]">Sign In </Link>
      </div>
      {/* <h1>Sign Up</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name" // Input for user's name
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleSignUp}>Sign Up</button>
      <hr />
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      <button onClick={handleFacebookSignIn}>Sign in with Facebook</button>
      <button onClick={handleAppleSignIn}>Sign in with Apple</button> */}
    </div>
  );
};

export default Signup;
