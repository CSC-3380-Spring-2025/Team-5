import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase'; // 👈 relative path to config/firebase.ts

export const saveArtistRating = async (
  artistId: string,
  artistName: string,
  rating: number
) => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not signed in');

  const userRef = doc(db, 'users', user.uid);

  const ratingEntry = {
    artistId,
    artistName,
    rating,
    dateRated: new Date().toISOString(),
  };

  await updateDoc(userRef, {
    'ratings.artists': arrayUnion(ratingEntry),
  });
};
