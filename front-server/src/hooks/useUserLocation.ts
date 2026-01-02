import Geolocation from '@react-native-community/geolocation';
import { useEffect, useState } from 'react';
import { LatLng } from 'react-native-maps';
import useAppState from '@/hooks/useAppState';

function useUserLocation() {
  const { isComeback } = useAppState();
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.5516,
    longitude: 126.9898,
  });
  const [isUserLocationError, setIsUserLocationError] = useState(false);

  const fetchLocation = () => {
    Geolocation.getCurrentPosition(
      ({ coords }) => {
        setUserLocation(coords);
        setIsUserLocationError(false);
      },
      () => setIsUserLocationError(true),
      { enableHighAccuracy: true },
    );
  };

  // 최초 실행
  useEffect(() => {
    fetchLocation();
  }, [isComeback]);

  return { userLocation, isUserLocationError };
}

export default useUserLocation;
