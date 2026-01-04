import CustomMarker from '@/components/CustomMarker';
import DrawerButton from '@/components/DrawerButton';
import MapIconButton from '@/components/MapIconButton';
import MarkerModal from '@/components/MarkerModal';
import { colors } from '@/constants/colors';
import { INITIAL_DELTA } from '@/constants/numbers';
import useMarkers from '@/hooks/queries/useMarkers';
import useModal from '@/hooks/useModal';
import useMoveMapView from '@/hooks/useMoveMapView';
import usePermission from '@/hooks/usePermission';
import useUserLocation from '@/hooks/useUserLocation';
import { MapStackParamList } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

type Navigation = StackNavigationProp<MapStackParamList>;

function MapHomeScreen() {
  const navigation = useNavigation<Navigation>();
  const { top } = useSafeAreaInsets();
  const { userLocation, isUserLocationError } = useUserLocation();
  const { mapRef, moveMapView, handleChangeDelta } = useMoveMapView();
  usePermission('LOCATION');
  const { isVisible, showModal, hideModal } = useModal();
  const [selectLocation, setSelectLocation] = useState<LatLng | null>(null);
  const [markerId, setMarkerId] = useState<number | null>(null);

  const { useGetMarkers } = useMarkers();
  const { data: markers = [] } = useGetMarkers();

  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      Toast.show({
        type: 'error',
        text1: '위치 권한 허용이 필요합니다.',
        position: 'bottom',
      });
      return;
    }

    moveMapView(userLocation);
  };

  const handlePressMarker = (id: number, coordinate: LatLng) => {
    setMarkerId(id);
    moveMapView(coordinate);
    showModal();
  };

  const handlePressAddLocation = () => {
    if (!selectLocation) {
      Alert.alert('추가할 위치를 선택해주세요.', '지도를 길제 누르면 위치가 선택됩니다.');
      return;
    }
    navigation.navigate('AddLocation', { location: selectLocation });
    setSelectLocation(null);
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
        onLongPress={({ nativeEvent }) => setSelectLocation(nativeEvent.coordinate)}
        onRegionChangeComplete={handleChangeDelta}>
        {markers.map(({ id, latitude, longitude, color, score }) => (
          <CustomMarker
            key={id}
            coordinate={{ latitude, longitude }}
            color={color}
            score={score}
            onPress={() => handlePressMarker(id, { latitude, longitude })}
          />
        ))}
        {selectLocation && (
          <Marker
            coordinate={selectLocation}
            title="Selected Location"
            description="This is the selected location"
          />
        )}
      </MapView>
      <View style={styles.buttonList}>
        <MapIconButton name="plus" onPress={handlePressAddLocation} />
        <MapIconButton name="location-crosshairs" onPress={handlePressUserLocation} />
      </View>
      <MarkerModal markerId={markerId ?? 0} isVisible={isVisible} onClose={hideModal} />
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
});

export default MapHomeScreen;
