"use client";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig.jsx";
import { useRouter } from "next/navigation";
import Link from "next/link.js";
import useAuth from "@/hooks/useAuth.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { user } = useAuth();
  

  if(user){
    router.push("/v2/home");
  } 

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/v2/home");
    } catch (err) {
      setError("Login failed: " + err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
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
        <h2 className="text-[20px]">Sign In</h2>
        <p>Hi! Welcome back, you’ve been missed</p>
      </div>
      <div className="flex flex-col gap-6">
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
          onClick={handleLogin}
          className="bg-[#FFCD48] py-2 px-4 text-center text-black rounded-3xl w-full text-[20px]"
        >
          Sign In
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="flex items-center gap-2">
        <span>
          <img src="/hoizontalLine.svg" className="w-full" />
        </span>
        <span>Or sign in with</span>
        <span>
          <img src="/hoizontalLine.svg" className="w-full" />
        </span>
      </div>
      <div className="flex gap-4 justify-center">
        <img
          src="/google.png"
          onClick={handleGoogleSignIn}
          className="w-[30px] h-[30px] cursor-pointer"
        />
        <img
          src="/facebook.png"
          onClick={handleFacebookSignIn}
          className="w-[30px] h-[30px] cursor-pointer"
        />
        <img
          src="/apple.png"
          onClick={handleAppleSignIn}
          className="w-[30px] h-[30px] cursor-pointer"
        />
      </div>
      
      <div className="text-[12px]">
        Don't have an account?{" "}
        <Link href={"/signup"} className="text-[#FFCD48]">
          Sign Up
        </Link>
      </div>
      {/* <h1>Login</h1>
     {error && <p style={{ color: 'red' }}>{error}</p>}
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
     <button onClick={handleLogin}>Login</button>
     <hr />
     <button onClick={handleGoogleSignIn}>Sign in with Google</button>
     <button onClick={handleFacebookSignIn}>Sign in with Facebook</button>
     <button onClick={handleAppleSignIn}>Sign in with Apple</button> */}
    </div>
  );
};

export default Login;
