import { baseUrls } from '@/api/axios';
import { colors } from '@/constants/colors';
import { Location } from '@/types/domain';
import { FeedStackParamList } from '@/types/navigation';
import { getDateWithSeparator } from '@/utils/date';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Dimensions, Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

interface FeedItemProps {
  location: Location;
}

function FeedItem({ location }: FeedItemProps) {
  const baseUrl = Platform.OS === 'android' ? baseUrls.android : baseUrls.ios;

  const navigation = useNavigation<StackNavigationProp<FeedStackParamList>>();

  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate('FeedDetail', { id: location.id })}>
      {location.imageUris.length > 0 && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: `${baseUrl}/${location.imageUris[0].uri}` }} style={styles.image} />
        </View>
      )}
      {location.imageUris.length === 0 && (
        <View style={[styles.imageContainer, styles.emptyContainer]}>
          <Text style={styles.descriptionText}>No image</Text>
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.dateText}>{getDateWithSeparator(location.date, '/')}</Text>
        <Text style={styles.titleText}>{location.title}</Text>
        <Text style={styles.descriptionText}>{location.description}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    marginVertical: 12,
  },
  imageContainer: {
    width: Dimensions.get('screen').width / 2 - 25,
    height: Dimensions.get('screen').width / 2 - 25,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.5)',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.GRAY_200,
    borderWidth: 1,
    borderRadius: 5,
  },
  textContainer: {
    marginTop: 7,
    gap: 2,
  },
  dateText: {
    color: colors.PINK_700,
    fontWeight: 600,
    fontSize: 12,
  },
  titleText: {
    color: colors.BLACK,
    fontWeight: 500,
    fontSize: 13,
  },
  descriptionText: {
    color: colors.GRAY_500,
    fontSize: 13,
  },
});

export default FeedItem;
