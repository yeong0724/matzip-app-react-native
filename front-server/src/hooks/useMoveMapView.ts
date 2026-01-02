import { INITIAL_DELTA } from '@/constants/numbers';
import { useRef, useState } from 'react';
import MapView, { LatLng, Region } from 'react-native-maps';

type Delta = Pick<Region, 'latitudeDelta' | 'longitudeDelta'>;

function useMoveMapView() {
  const mapRef = useRef<MapView | null>(null);

  const [regionDelta, setRegionDelta] = useState<Delta>(INITIAL_DELTA);

  const moveMapView = (coordinates: LatLng, delta?: Delta) => {
    mapRef.current?.animateToRegion({
      ...coordinates,
      ...(delta || regionDelta),
    });
  };

  const handleChangeDelta = (region: Region) => {
    const { latitudeDelta, longitudeDelta } = region;
    setRegionDelta({ latitudeDelta, longitudeDelta });
  };

  return {
    mapRef,
    moveMapView,
    handleChangeDelta,
  };
}

export default useMoveMapView;
