import React, { useState } from "react";
import Header from "../components/global/Header";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { Navigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/user-slice";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const providerGoogle = new GoogleAuthProvider();
const providerGitHub = new GithubAuthProvider();

const Logar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const loginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, providerGoogle);
      const user = result.user;

      dispatch(
        userActions.setLoginStatus({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        })
      );
    } catch (error) {
      toast.error("Erro ao fazer login com Google: " + error.message);
    }
  };

  const loginGitHub = async () => {
    try {
      const result = await signInWithPopup(auth, providerGitHub);
      const user = result.user;

      dispatch(
        userActions.setLoginStatus({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        })
      );
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        toast.error(
          "Esse e-mail já está associado a uma conta. Tente fazer login usando o Google."
        );
      } else {
        toast.error("Erro ao fazer login com GitHub: " + error.message);
      }
    }
  };

  if (user && user.user) {
    return <Navigate to="/taskmanager" />;
  }

  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-[80vh]">
        <div className="p-[2px] mx-2 rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <Toaster />
          <div className="flex flex-col items-center gap-5 border bg-[#2a2d32] lg:p-8 p-2 rounded">
            <div>
              <h2 className="text text-center font-main font-bold text-[25px] text-white">
                Bem-vindo(a)
              </h2>
              <h3 className="font-title text-[17px] text-center text-[#a9abad]">
                Faça login ou inscreva-se para continuar.
              </h3>
            </div>

            <div className="flex flex-col gap-5">
              <button
                onClick={loginGoogle}
                disabled={user}
                className="flex font-titles items-center max-w-xs px-6 py-2 text-sm font-bold text-gray-700 bg-white border border-black/25 rounded-lg gap-3 transition duration-600 transform hover:scale-105"
              >
                <svg
                  className="h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid"
                  viewBox="0 0 256 262"
                >
                  <path
                    fill="#4285F4"
                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                  ></path>
                  <path
                    fill="#EB4335"
                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  ></path>
                </svg>
                Continue with Google
              </button>

              <button
                onClick={loginGitHub}
                disabled={user}
                className="flex font-titles items-center bg-neutral-900 text-white max-w-xs px-6 py-2 text-sm font-bold rounded-lg gap-3 shadow-md transition duration-600 transform hover:scale-105"
              >
                <svg
                  className="h-[30px]"
                  fill="#ffffff"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <title>github</title>
                  <rect fill="none" height="24" width="24"></rect>
                  <path d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z"></path>
                </svg>
                Continue with Github
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Logar;
