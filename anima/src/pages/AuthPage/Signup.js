import React, { useState } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";

export default function Signup() {

    const [email, SetEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const sub = async (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, pwd)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage);
        });
    };

    const googlesignin = () => {
        signInWithPopup(auth, provider)
          .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log(user);
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
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => {
                            SetEmail(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <label >Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => {
                            setPwd(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <button type="submit">
                        Sign In
                    </button>
                </div>
                <div>
                    <button onClick={googlesignin} >
                        Google
                    </button>
                </div>
            </form>
        </div>
    );
}