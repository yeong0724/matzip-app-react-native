import { Location } from '@/types/domain';
import axiosInstance from '@/api/axios';

async function createLocation(body: Omit<Location, 'id'>): Promise<Location> {
  const { data } = await axiosInstance.post('/posts', body);
  return data;
}

async function getLocation(id: number): Promise<Location> {
  const { data } = await axiosInstance.get(`/posts/${id}`);
  return data;
}

export { createLocation, getLocation };
