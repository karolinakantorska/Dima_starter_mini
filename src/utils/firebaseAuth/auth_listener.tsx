import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../../firebase';

export const useAuth = () => {
  const [user, setUser] = useState<{ uid: string } | null>(null);
  const [loadingAuth, setLoading] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      //const uid = user.uid;
      setUser(user);
      setLoading(false);
      //console.log(user.uid);
      //console.log(user.email);

    } else {
      setLoading(false);
      //console.log('no user');
      setUser(null);
    }
  })

  return { user, loadingAuth }
}