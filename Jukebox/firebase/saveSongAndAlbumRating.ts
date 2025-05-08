import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export const saveSongRating = async (
  songId: string,
  songName: string,
  rating: number
) => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not signed in');

  const userRef = doc(db, 'users', user.uid);
  const entry = {
    songId,
    songName,
    rating,
    dateRated: new Date().toISOString(),
  };

  await updateDoc(userRef, {
    'ratings.songs': arrayUnion(entry),
  });
};

export const saveAlbumRating = async (
  albumId: string,
  albumName: string,
  rating: number
) => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not signed in');

  const userRef = doc(db, 'users', user.uid);
  const entry = {
    albumId,
    albumName,
    rating,
    dateRated: new Date().toISOString(),
  };

  await updateDoc(userRef, {
    'ratings.albums': arrayUnion(entry),
  });
};
