import { getLocation } from '@/api/location';
import { queryKeys } from '@/constants/keys';
import { UseQueryCustomOptions } from '@/types/api';
import { Location } from '@/types/domain';
import { useQuery } from '@tanstack/react-query';

function useGetLocation(id: number, queryOptions?: UseQueryCustomOptions<Location>) {
  return useQuery({
    queryKey: [queryKeys.LOCATION, queryKeys.GET_LOCATION, id],
    queryFn: () => getLocation(Number(id)),
    ...queryOptions,
  });
}

export default useGetLocation;
