import React, { useState } from 'react';
import { signInWithEmailAndPassword, } from "firebase/auth";
import { auth } from '../../../firebase';
import { useRouter } from 'next/router';

export interface Inputs { email: string, password: string };

export const useLogin = (inputs: Inputs = { email: '', password: '' }) => {
  const router = useRouter()
  const [error, setError] = useState<boolean | string>(false);
  const [loadingLogin, setLoadingLogin] = useState(false);

  const login = async (inputs: Inputs) => {
    const { email, password } = inputs;
    setLoadingLogin(true);
    try {
      //console.log('succes');
      const user = await signInWithEmailAndPassword(auth, email, password);
      //console.log('succes2');
      //console.log(user);
      setLoadingLogin(false);
      router.push('/');
    } catch (error: any) {
      setLoadingLogin(false);
      setError(error.code);
    }

  }
  return { error, loadingLogin, login }
}

