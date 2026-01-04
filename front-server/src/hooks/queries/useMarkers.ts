import { getMarkers } from '@/api/marker';
import { queryKeys } from '@/constants/keys';
import { UseQueryCustomOptions } from '@/types/api';
import { Marker } from '@/types/domain';
import { useQuery } from '@tanstack/react-query';

function useMarkers() {
  function useGetMarkers(queryOptions?: UseQueryCustomOptions<Marker[]>) {
    return useQuery({
      queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      queryFn: getMarkers,
      ...queryOptions,
    });
  }

  return {
    useGetMarkers,
  };
}

export default useMarkers;
