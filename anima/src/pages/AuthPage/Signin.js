import React, { useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Signin() {

  const navigate = useNavigate();
  const [email, SetEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const sub = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, pwd)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate('/dshboard');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };


  const googlesignin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        navigate('/dshboard');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  return (
    <div>
      <form
        onSubmit={(event) => {
          sub(event);
        }}
      >
        <div>
          <label>
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => {
              SetEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label >
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPwd(e.target.value);
            }}
          />
        </div>
        <div>
          <button>
            Sign In
          </button>
        </div>
        <div>
          <button
            onClick={googlesignin}
          >
            Google
          </button>
        </div>
      </form>
    </div>
  );
}