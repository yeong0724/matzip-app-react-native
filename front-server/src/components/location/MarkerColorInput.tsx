import { colors } from '@/constants/colors';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomMarker from '@/components/common/CustomMarker';

interface MarkerColorInputProps {
  color: string;
  onChangeColor: (color: string) => void;
  score: number;
}
function MarkerColorInput({ color, onChangeColor, score }: MarkerColorInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.markerLabel}>마커 색상 선택</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.markerInputScroll}>
          {[
            colors.PINK_400,
            colors.BLUE_400,
            colors.YELLOW_400,
            colors.GREEN_400,
            colors.PURPLE_400,
          ].map(optionColor => (
            <Pressable
              key={optionColor}
              style={[styles.markerBox, color === optionColor && styles.pressedMarker]}
              onPress={() => onChangeColor(optionColor)}>
              <CustomMarker color={optionColor} score={score} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    padding: 15,
  },
  markerLabel: {
    marginBottom: 15,
    color: colors.GRAY_700,
  },
  markerInputScroll: {
    flexDirection: 'row',
    gap: 20,
  },
  markerBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 6,
    backgroundColor: colors.GRAY_100,
  },
  pressedMarker: {
    borderWidth: 2,
    borderColor: colors.RED_500,
  },
});

export default MarkerColorInput;
