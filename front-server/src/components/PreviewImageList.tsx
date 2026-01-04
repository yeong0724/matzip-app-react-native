import { baseUrls } from '@/api/axios';
import { colors } from '@/constants/colors';
import { ImageUri } from '@/types/domain';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Image, Platform, Pressable, ScrollView, StyleSheet } from 'react-native';

interface PreviewImageListProps {
  imageUriList: ImageUri[];
  onDelete?: (uri: string) => void;
}

function PreviewImageList({ imageUriList, onDelete }: PreviewImageListProps) {
  const baseUrl = Platform.OS === 'android' ? baseUrls.android : baseUrls.ios;
  return (
    <ScrollView horizontal contentContainerStyle={styles.container}>
      {imageUriList.map(({ uri }) => (
        <Pressable key={uri} style={styles.imageContainer}>
          <Image source={{ uri: `${baseUrl}/${uri}` }} style={styles.image} resizeMode="cover" />
          <Pressable style={styles.deleteButton} onPress={() => onDelete?.(uri)}>
            <Ionicons name="close" size={16} color={colors.WHITE} />
          </Pressable>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 15,
    paddingHorizontal: 15,
  },
  imageContainer: {
    width: 70,
    height: 70,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: colors.BLACK,
  },
});

export default PreviewImageList;
