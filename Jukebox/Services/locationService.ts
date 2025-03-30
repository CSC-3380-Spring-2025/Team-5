import * as Location from 'expo-location';

export const getLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permission denied');
  }

  const location = await Location.getCurrentPositionAsync({});
  return location.coords;
};

export const getCityFromCoords = async (latitude: number, longitude: number) => {
  const geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
  if (geocode.length > 0) {
    const place = geocode[0];
    return place.city || place.region || place.country || 'your area';
  }
  return 'your area';
};
