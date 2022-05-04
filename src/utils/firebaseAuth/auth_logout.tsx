import { auth } from '../../../firebase';
import { signOut } from 'firebase/auth';


export function logOut() {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}