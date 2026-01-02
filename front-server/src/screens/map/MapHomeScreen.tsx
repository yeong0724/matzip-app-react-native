import DrawerButton from '@/components/DrawerButton';
import { colors } from '@/constants/colors';
import { INITIAL_DELTA } from '@/constants/numbers';
import usePermission from '@/hooks/usePermission';
import useUserLocation from '@/hooks/useUserLocation';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import React, { useRef } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import MapView, { LatLng, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

function MapHomeScreen() {
  const { top } = useSafeAreaInsets();
  const mapRef = useRef<MapView | null>(null);
  const { userLocation, isUserLocationError } = useUserLocation();
  usePermission('LOCATION');

  const moveMapView = (coordinates: LatLng) => {
    mapRef.current?.animateToRegion({
      ...coordinates,
      ...INITIAL_DELTA,
    });
  };

  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      Toast.show({
        type: 'error',
        text1: '위치 권한 허용이 필요합니다.',
        position: 'bottom',
      });
      return;
    }
    console.log('userLocation', userLocation);
    moveMapView(userLocation);
  };

  return (
    <>
      <DrawerButton style={[styles.drawerButton, { top: top + 10 }]} color={colors.WHITE} />
      <MapView
        googleMapId="2dc0af3de6bac576f718ee18"
        ref={mapRef}
        region={{ ...userLocation, ...INITIAL_DELTA }}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
      />
      <View style={styles.buttonList}>
        <Pressable style={styles.mapButton} onPress={handlePressUserLocation}>
          <FontAwesome6
            iconStyle="solid"
            size={25}
            color={colors.WHITE}
            name="location-crosshairs"
          />
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: colors.PINK_700,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
  },
  buttonList: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 1,
  },
  mapButton: {
    backgroundColor: colors.PINK_700,
    marginVertical: 5,
    height: 45,
    width: 45,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
  },
});

export default MapHomeScreen;
