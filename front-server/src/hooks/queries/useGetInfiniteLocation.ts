import { getLocations } from '@/api/location';
import { queryKeys } from '@/constants/keys';
import { ResponseError } from '@/types/api';
import { Location } from '@/types/domain';
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';

function useGetInfiniteLocation(
  queryOptions?: UseInfiniteQueryOptions<
    Location[],
    ResponseError,
    InfiniteData<Location[], number>,
    QueryKey,
    number
  >,
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) => getLocations(pageParam),
    queryKey: [queryKeys.LOCATION, queryKeys.GET_LOCATIONS],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastLocation = lastPage[lastPage.length - 1];
      return lastLocation ? allPages.length + 1 : undefined;
    },
    staleTime: 0,
    gcTime: 0,
    enabled: true,
    ...queryOptions,
  });
}

export default useGetInfiniteLocation;
