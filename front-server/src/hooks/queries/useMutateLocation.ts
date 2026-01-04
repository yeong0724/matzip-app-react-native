import { createLocation } from '@/api/location';
import queryClient from '@/api/queryClient';
import { queryKeys } from '@/constants/keys';
import { UseMutationCustomOptions } from '@/types/api';
import { useMutation } from '@tanstack/react-query';

function useMutateLocation(MutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: createLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS] });
    },
    ...MutationOptions,
  });
}

export default useMutateLocation;
