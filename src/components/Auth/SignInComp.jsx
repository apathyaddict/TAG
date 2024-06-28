import React from "react";

const SignInComp = () => {
  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md">
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
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
        />
      </div>
      <div>
        <button
          type="submit"
          className="px-4 py-2 font-medium text-white bg-zinc-800 rounded-md shadow-sm hover:bg-zinc-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500">
          Se connecter
        </button>
      </div>
    </div>
  );
};

export default SignInComp;
