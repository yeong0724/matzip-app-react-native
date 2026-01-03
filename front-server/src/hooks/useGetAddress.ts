import axios from 'axios';
import get from 'lodash/get';
import { useEffect, useState } from 'react';
import Config from 'react-native-config';
import { LatLng } from 'react-native-maps';

function useGetAddress(location: LatLng) {
  const { latitude, longitude } = location;
  const [address, setAddress] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const reverseGeocodeParams = {
          latlng: `${latitude},${longitude}`,
          result_type: 'street_address',
          language: 'ko',
          key: Config.GOOGLE_MAP_API_KEY,
        };

        const { data } = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
          params: reverseGeocodeParams,
        });

        const result = get(
          data,
          'results[0].formatted_address',
          `${latitude.toFixed(4)},${longitude.toFixed(4)}`,
        );

        setAddress(result);
      } catch (error) {
        setAddress('알수 없는 주소입니다.');
      }
    })();
  }, [latitude, longitude]);

  return address;
}

export default useGetAddress;
