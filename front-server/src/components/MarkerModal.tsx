import { baseUrls } from '@/api/axios';
import { colors } from '@/constants/colors';
import useGetLocation from '@/hooks/queries/useGetLocation';
import { getDateWithSeparator } from '@/utils/date';
import Ionicons from '@react-native-vector-icons/ionicons';
import {
  Image,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface MarkerModalProps {
  markerId: number;
  isVisible: boolean;
  onClose: () => void;
}

function MarkerModal({ markerId, isVisible, onClose }: MarkerModalProps) {
  const { data: location, isPending, isError } = useGetLocation(markerId);

  const baseUrl = Platform.OS === 'android' ? baseUrls.android : baseUrls.ios;

  if (isPending || isError) {
    return null;
  }

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <SafeAreaView style={styles.background} onTouchEnd={onClose}>
        <Pressable style={styles.cardContainer}>
          <View style={styles.cardInner}>
            <View style={styles.cardAlign}>
              {location?.imageUris.length > 0 && (
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: `${baseUrl}/${location.imageUris[0].uri}` }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </View>
              )}
              {location?.imageUris.length === 0 && (
                <View style={[styles.imageContainer, styles.emptyImageContainer]}>
                  <Text style={styles.emptyText}>No image</Text>
                </View>
              )}
              <View style={styles.infoContainer}>
                <View style={styles.addressContainer}>
                  {/* <Ionicons name="locate-outline" size={10} color={colors.GRAY_500} /> */}
                  <Text style={styles.addressText} numberOfLines={1} ellipsizeMode="tail">
                    {location?.address}
                  </Text>
                </View>
                <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">
                  {location.title}
                </Text>
                <Text style={styles.dateText} numberOfLines={1} ellipsizeMode="tail">
                  {getDateWithSeparator(location.date, '. ')}
                </Text>
              </View>
            </View>
            <View style={styles.nextButton}>
              <Ionicons name="chevron-forward" size={25} color={colors.BLACK} />
            </View>
          </View>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardContainer: {
    backgroundColor: colors.WHITE,
    margin: 10,
    borderWidth: 1,
    borderColor: colors.GRAY_500,
    borderRadius: 15,
    boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
  },
  cardInner: {
    padding: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
  emptyImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.GRAY_200,
  },
  emptyText: {
    fontSize: 12,
    color: colors.GRAY_500,
  },
  infoContainer: {
    marginLeft: 15,
    gap: 5,
  },
  addressText: {
    fontSize: 12,
    color: colors.GRAY_700,
  },
  cardAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  titleText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  dateText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.PINK_700,
  },
  nextButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
export default MarkerModal;
