import { LatLng } from 'react-native-maps';
import { create } from 'zustand';

interface LocationStoreType {
  moveLocation: LatLng | null;
  setMoveLocation: (moveLocation: LatLng | null) => void;
}

const useLocationStore = create<LocationStoreType>(set => ({
  moveLocation: null,
  setMoveLocation: (moveLocation: LatLng | null) => set(state => ({ ...state, moveLocation })),
}));

export default useLocationStore;
