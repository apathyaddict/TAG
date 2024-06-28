import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignInComp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("user logged in successfully");
      // Use Navigate component or other navigation method here
      navigate("/");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="flex space-x-4 w-full">
        <div>
          <label htmlFor="email" className="sr-only">
            Adresse e-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Mot de passe
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
          />
        </div>
        <div>
          <button
            type="submit"
            className="px-4 py-2 font-normal text-white bg-zinc-800 rounded-md shadow-sm hover:bg-zinc-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500">
            Se connecter
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInComp;
