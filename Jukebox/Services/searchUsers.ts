/*
    This code was originally in Darrion's pull request but the request was so messed up that 
    I'm just going to make a new pull request for this file in a different branch.
*/ 

import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../config/firebase';

export const searchUsers = async (searchTerm: string, maxResults: number = 10) => {
  const modifyTerm = searchTerm.trim();
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('username', '>=', modifyTerm), where('username', '<=', modifyTerm + '\uf8ff'), limit(maxResults));


  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as {
    id: string;
    username: string;
    email: string;
    profilePicture: string;
  }[];
};