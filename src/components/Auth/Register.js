import { createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { auth } from "../../firebase";

const Register = () => {
  const handleResgister = async (e) => {
    e.preventdefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;
      console.log(user);
      console.log("user is registered succesfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  return <div>Register</div>;
};

export default Register;
