import React, { useState } from 'react';
import { createUserWithEmailAndPassword, } from "firebase/auth";
import { auth } from '../../../firebase';
import { useRouter } from 'next/router';

interface Inputs { email: string, password: string };

export const useRegister = (inputs: Inputs = { email: '', password: '' }) => {
  const router = useRouter()
  const [error, setError] = useState(null);
  const [loadingLogin, setLoadingLogin] = useState(false);

  const register = async (inputs: Inputs) => {
    const { email, password } = inputs;
    setLoadingLogin(true);
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      //console.log(user);
      setLoadingLogin(false);
      router.push('/');
    } catch (error: any) {
      setLoadingLogin(false);
      const errorCode = error.code;
      const errorMessage = error.message;
      //console.log('errorCode:', errorCode);
      console.log('Message', errorMessage);
      setError(error);
    }
  }
  return { error, register }
}