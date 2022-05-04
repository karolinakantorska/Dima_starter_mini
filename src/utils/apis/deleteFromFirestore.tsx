import { doc, deleteDoc, setDoc,addDoc,collection, WithFieldValue,DocumentData } from "firebase/firestore"; 
import { SyntheticEvent } from "react";
import {db} from '../../../firebase';

    export async function deleteDocument(e:SyntheticEvent,title: string, id: string){
        e.preventDefault();
        console.log('I am deleting a project');
        await deleteDoc(doc(db, title, id));
    }



