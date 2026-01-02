import axiosInstance from '@/api/axios';
import { Profile } from '@/types/domain';
import { getEncryptStorage } from '@/utils/encryptStorage';

type RequestUser = {
  email: string;
  password: string;
};

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

async function postSignup({ email, password }: RequestUser): Promise<void> {
  await axiosInstance.post('/auth/signup', { email, password });
}

async function postLogin({ email, password }: RequestUser): Promise<ResponseToken> {
  const { data } = await axiosInstance.post('/auth/signin', { email, password });
  return data;
}

async function getProfile(): Promise<Profile> {
  const { data } = await axiosInstance.get('/auth/me');
  return data;
}

async function getAccessToken(): Promise<ResponseToken> {
  const refreshToken = await getEncryptStorage('refreshToken');

  const { data } = await axiosInstance.get('/auth/refresh', {
    headers: { Authorization: `Bearer ${refreshToken}` },
  });

  return data;
}

async function logout() {
  await axiosInstance.post('/auth/logout');
}

export { getAccessToken, getProfile, logout, postLogin, postSignup };
