
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';

export async function addToFavorites(
  type: 'track' | 'album' | 'artist',
  id: string
) {
  const user = auth.currentUser;
  if (!user) return;

  const userRef = doc(db, 'users', user.uid);

  const fieldMap = {
    track: 'featuredSongs',
    album: 'featuredAlbums',
    artist: 'featuredArtists',
  };

  const field = fieldMap[type];

  await updateDoc(userRef, {
    [field]: arrayUnion({ id, type }),
  });
}
