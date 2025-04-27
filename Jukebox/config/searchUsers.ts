import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

export const searchUsers = async (searchTerm: string) => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('name', '>=', searchTerm), where('name', '<=', searchTerm + '\uf8ff'));
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as {
    id: string;
    name: string;
    profilePictureUrl: string;
  }[];
};