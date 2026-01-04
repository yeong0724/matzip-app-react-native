import { getAccessToken, getProfile, logout, postLogin, postSignup } from '@/api/auth';
import queryClient from '@/api/queryClient';
import { queryKeys, storageKeys } from '@/constants/keys';
import { ACCESS_TOKEN_REFRESH_TIME } from '@/constants/numbers';
import { UseMutationCustomOptions, UseQueryCustomOptions } from '@/types/api';
import { Profile } from '@/types/domain';
import { removeEncryptStorage, setEncryptStorage } from '@/utils/encryptStorage';
import { removeHeader, setHeader } from '@/utils/header';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
}

function useLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: async ({ accessToken, refreshToken }) => {
      setHeader('Authorization', `Bearer ${accessToken}`);
      await setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);

      queryClient.fetchQuery({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
    },
    ...mutationOptions,
  });
}

function useGetRefreshToken() {
  const { data, isSuccess, isError } = useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
    queryFn: getAccessToken,
    staleTime: ACCESS_TOKEN_REFRESH_TIME,
    refetchInterval: ACCESS_TOKEN_REFRESH_TIME,
  });

  useEffect(() => {
    (async () => {
      if (isSuccess) {
        setHeader('Authorization', `Bearer ${data.accessToken}`);
      }
    })();
  }, [data, isSuccess]);

  useEffect(() => {
    (async () => {
      if (isError) {
        removeHeader('Authorization');
        await removeEncryptStorage(storageKeys.REFRESH_TOKEN);
      }
    })();
  }, [isError]);

  return { isSuccess, isError };
}

function useGetProfile(queryOptions?: UseQueryCustomOptions<Profile>) {
  return useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    queryFn: getProfile,
    ...queryOptions,
  });
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
      queryClient.resetQueries({ queryKey: [queryKeys.AUTH] });
    },
    ...mutationOptions,
  });
}

function useAuth() {
  const signupMutation = useSignup();
  const loginMutation = useLogin();
  const refreshTokenQuery = useGetRefreshToken();
  const { data, isSuccess: isLogin } = useGetProfile({
    enabled: refreshTokenQuery.isSuccess,
  });

  const logoutMutation = useLogout();

  return {
    auth: {
      id: data?.id ?? '',
      nickname: data?.nickname ?? '',
      email: data?.email ?? '',
      imageUri: data?.imageUri ?? '',
    },
    signupMutation,
    loginMutation,
    isLogin,
    logoutMutation,
  };
}

export default useAuth;
