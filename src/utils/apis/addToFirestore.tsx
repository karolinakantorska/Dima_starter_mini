
import { doc, setDoc, addDoc, collection, WithFieldValue, DocumentData } from "firebase/firestore";
import { SyntheticEvent, useState } from "react";
import { db } from '../../../firebase';

export function useAddProjestToFirestore() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<boolean | string>(false);

    const [savedProjectId, setSavedProjectId] = useState('');

    async function addProject(title: string, project: WithFieldValue<DocumentData>) {
        setLoading(true);
        console.log('I am adding a project', project);
        await addDoc(collection(db, title), project)
            .then(function (response: any) {
                //console.log('response ', response._key.path.segments)
                setSavedProjectId(response._key.path.segments[1]);
                setLoading(false);
            })
            .catch(function (error) {
                //console.log('error: ', error)
                setError(error.code);
                setLoading(false);
            });
    }
    async function edit(title: string, id: string, project: WithFieldValue<DocumentData>) {
        setLoading(true);
        await setDoc(doc(db, title, id), project)
            .then(function (response: any) {
                //console.log('response ', response)
                setLoading(false);
            })
            .catch(function (error) {
                setError(error);
                setLoading(false);
            });
    }

    return { addProject, edit, loading, error, savedProjectId }
}


