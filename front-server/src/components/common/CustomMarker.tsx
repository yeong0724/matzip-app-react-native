import { colors } from '@/constants/colors';
import { StyleSheet, View } from 'react-native';
import { LatLng, Marker, MyMapMarkerProps } from 'react-native-maps';

interface CustomMarkerProps extends MyMapMarkerProps {
  coordinate?: LatLng;
  color: string;
  score?: number;
}

interface MarkerViewProps {
  color: string;
  score: number;
}

const MarkerView = ({ color, score }: MarkerViewProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.marker, { backgroundColor: color }]}>
        <View style={[styles.eye, styles.leftEye]} />
        <View style={[styles.eye, styles.rightEye]} />
        {score > 3 && <View style={[styles.mouth, styles.good]} />}
        {score === 3 && <View style={[styles.soso]} />}
        {score < 3 && <View style={[styles.mouth, styles.bad]} />}
      </View>
    </View>
  );
};

function CustomMarker({ coordinate, color, score = 5, ...props }: CustomMarkerProps) {
  return coordinate ? (
    <Marker coordinate={coordinate} {...props}>
      <MarkerView color={color} score={score} />
    </Marker>
  ) : (
    <MarkerView color={color} score={score} />
  );
}

const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 35,
    alignItems: 'center',
  },
  marker: {
    transform: [{ rotate: '45deg' }],
    width: 27,
    height: 27,
    borderRadius: 27,
    borderColor: colors.BLACK,
    borderWidth: 1,
    borderBottomRightRadius: 1,
  },
  eye: {
    position: 'absolute',
    backgroundColor: colors.BLACK,
    height: 4,
    width: 4,
    borderRadius: 4,
  },
  leftEye: {
    top: 12,
    left: 5,
  },
  rightEye: {
    top: 5,
    left: 12,
  },
  mouth: {
    transform: [{ rotate: '45deg' }],
    width: 12,
    height: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderTopColor: 'rgba(255, 255, 255/ 0.01)',
    borderBottomColor: 'rgba(255, 255, 255/ 0.01)',
  },
  good: {
    marginLeft: 7,
    marginTop: 7,
    borderLeftColor: 'rgba(255, 255, 255/ 0.01)',
  },
  bad: {
    marginLeft: 14,
    marginTop: 14,
    borderRightColor: 'rgba(255, 255, 255/ 0.01)',
  },
  soso: {
    width: 8,
    height: 8,
    borderLeftColor: colors.BLACK,
    borderLeftWidth: 1,
    transform: [{ rotate: '45deg' }],
    marginLeft: 14,
    marginTop: 14,
  },
});

export default CustomMarker;
