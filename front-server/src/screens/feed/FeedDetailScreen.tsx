import { baseUrls } from '@/api/axios';
import CustomButton from '@/components/common/CustomButton';
import PreviewImageList from '@/components/common/PreviewImageList';
import { colors } from '@/constants/colors';
import useGetLocation from '@/hooks/queries/useGetLocation';
import useLocationStore from '@/stores/location';
import { FeedStackParamList } from '@/types/navigation';
import { getDateWithSeparator } from '@/utils/date';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Dimensions, Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = StackScreenProps<FeedStackParamList, 'FeedDetail'>;

function FeedDetailScreen({ route }: Props) {
  const { id } = route.params;
  const navigation = useNavigation();
  const baseUrl = Platform.OS === 'android' ? baseUrls.android : baseUrls.ios;
  const insets = useSafeAreaInsets();
  const { setMoveLocation } = useLocationStore();
  const { data: location, isPending, isError } = useGetLocation(id);

  if (isPending || isError) {
    return <></>;
  }

  const handlePressLocation = () => {
    const { latitude, longitude } = location;

    setMoveLocation({
      latitude,
      longitude,
    });
    navigation.navigate('Map', { screen: 'MapHome' });
  };

  return (
    <>
      <View style={[styles.header, { top: insets.top }]}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          color={colors.WHITE}
          style={{
            textShadowColor: colors.BLACK,
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 2,
          }}
          onPress={() => navigation.goBack()}
        />
        <Ionicons
          name="ellipsis-vertical"
          size={30}
          color={colors.WHITE}
          style={{
            textShadowColor: colors.BLACK,
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 2,
          }}
        />
      </View>
      <ScrollView>
        <View style={styles.imageContainer}>
          {location.imageUris.length > 0 && (
            <Image
              source={{ uri: `${baseUrl}/${location.imageUris[0].uri}` }}
              style={styles.image}
            />
          )}
          {location.imageUris.length === 0 && (
            <View style={styles.emptyImageContainer}>
              <Text>No image</Text>
            </View>
          )}
        </View>
        <View style={styles.contentsContainer}>
          <View style={styles.addressContainer}>
            <Ionicons name="location" size={10} color={colors.GRAY_500} />
            <Text style={styles.addressText} ellipsizeMode="tail" numberOfLines={1}>
              {location.address}
            </Text>
          </View>
          <Text style={styles.titleText}>{location.title}</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <View style={styles.infoColumn}>
                <Text style={styles.infoColumnKeyText}>방문 날짜</Text>
                <Text style={styles.infoColumnValueText}>
                  {getDateWithSeparator(location.date, '. ')}
                </Text>
              </View>
              <View style={styles.infoColumn}>
                <Text style={styles.infoColumnKeyText}>평점 </Text>
                <Text style={styles.infoColumnValueText}>{location.score}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoColumn}>
                <Text style={styles.infoColumnKeyText}>마커 색상</Text>
                <View style={[styles.markerColor, { backgroundColor: location.color }]} />
              </View>
            </View>
          </View>
          <Text style={styles.descriptionText}>{location.description}</Text>
        </View>
        <View style={{ height: 10, backgroundColor: colors.GRAY_200 }} />
        {location.imageUris.length > 0 && (
          <View style={styles.imageContentsContainer}>
            <PreviewImageList imageUriList={location.imageUris} />
          </View>
        )}
      </ScrollView>
      <View style={[styles.bottomContainer, { paddingBottom: insets.bottom }]}>
        <CustomButton
          size="small"
          label={<Ionicons name="star" size={25} color={colors.WHITE} />}
          style={{ paddingHorizontal: 5 }}
        />
        <CustomButton
          size="small"
          label="위치보기"
          style={{ width: '30%' }}
          onPress={handlePressLocation}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    zIndex: 1,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '100%',
  },
  imageContainer: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').width,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContentsContainer: {
    paddingVertical: 15,
    backgroundColor: colors.WHITE,
    marginBottom: 10,
  },
  emptyImageContainer: {
    height: Dimensions.get('screen').width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.GRAY_200,
    borderColor: colors.GRAY_200,
    borderWidth: 1,
  },
  contentsContainer: {
    padding: 20,
    backgroundColor: colors.WHITE,
    marginBottom: 10,
  },
  addressContainer: {
    gap: 5,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    color: colors.GRAY_500,
    fontSize: 12,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  infoContainer: {
    marginVertical: 20,
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
  },
  infoColumn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  infoColumnKeyText: {
    color: colors.BLACK,
  },
  infoColumnValueText: {
    color: colors.PINK_700,
  },
  markerColor: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  descriptionText: {
    color: colors.BLACK,
    lineHeight: 25,
    fontSize: 16,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.WHITE,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GRAY_200,
    gap: 5,
  },
});

export default FeedDetailScreen;
