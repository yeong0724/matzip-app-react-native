import { colors } from '@/constants/colors';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Pressable, StyleSheet, Text } from 'react-native';

interface ImageInputProps {
  onChange: () => void;
}

function ImageInput({ onChange }: ImageInputProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.imageInput, pressed && styles.imageInputPressed]}
      onPress={onChange}>
      <Ionicons name="camera-outline" size={20} color={colors.GRAY_500} />
      <Text style={styles.inputText}>사진추가</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imageInput: {
    borderWidth: 1.5,
    borderColor: colors.GRAY_300,
    height: 70,
    width: 70,
    borderStyle: 'dotted',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  imageInputPressed: {
    opacity: 0.5,
  },
  inputText: {
    fontSize: 12,
    color: colors.GRAY_500,
  },
});

export default ImageInput;
