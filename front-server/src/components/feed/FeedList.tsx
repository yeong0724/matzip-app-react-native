import useGetInfiniteLocation from '@/hooks/queries/useGetInfiniteLocation';
import { FlatList, StyleSheet, Text } from 'react-native';
import FeedItem from '@/components/feed/FeedItem';
import { useState } from 'react';
import { queryKeys } from '@/constants/keys';
import queryClient from '@/api/queryClient';

function FeedList() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    data: locations,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfiniteLocation();

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    queryClient.resetQueries({ queryKey: [queryKeys.LOCATION, queryKeys.GET_LOCATIONS] });
    await refetch();
    setIsRefreshing(false);
  };

  return (
    <>
      <Text>{locations?.pages.flat().length}</Text>
      <FlatList
        data={locations?.pages.flat()}
        renderItem={({ item }) => <FeedItem location={item} />}
        keyExtractor={item => String(item.id)}
        numColumns={2}
        contentContainerStyle={styles.contentContainer}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.3}
        onRefresh={handleRefresh}
        refreshing={isRefreshing}
      />
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 15,
  },
});

export default FeedList;
