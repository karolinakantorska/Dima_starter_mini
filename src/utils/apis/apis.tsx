import React, { useState } from "react";
import { collection, getDocs, doc, getDoc, query, orderBy } from "firebase/firestore";
import { db } from '../../../firebase';

export async function getOrderedCollection(collectionName: string, sortBy: string) {
  const q = query(collection(db, collectionName), orderBy(sortBy, "desc"));

  const querySnapshot = await getDocs(q);

  const res = querySnapshot.docs.map((entry) => ({
    id: entry.id,
    ...entry.data(),
  }));
  //console.log('data',res)
  return res;
}
export async function getCollectionId(collectionName: string) {
  const projectsCol = collection(db, collectionName);
  const projectSnapshot = await getDocs(projectsCol);
  const res = projectSnapshot.docs.map((entry) => ({
    id: entry.id,
  }));
  //console.log('data',res)
  return res;
}
export async function getCollectionDocument(
  collectionName: string,
  docId: string
) {
  const ref = doc(db, collectionName, docId);
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    const project = docSnap.data();
    const projectWithID = { ...project, id: docId }
    return projectWithID;
    //console.log(project.toString())
  } else {
    console.log("No such document!");
    return {};
  }
}

export async function getCollection(collectionName: string) {
  const projectsCol = collection(db, collectionName);
  const projectSnapshot = await getDocs(projectsCol);
  const res = projectSnapshot.docs.map((entry) => ({
    id: entry.id,
    ...entry.data(),
  }));
  //console.log('data',res)
  return res;
}
