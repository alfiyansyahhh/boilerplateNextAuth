import provider, { IProvider } from '@/providers';
import MutationTypes from '@/providers/methods';
import { toast } from 'react-toastify';

export const createNewJob = async (data: any) => {
  try {
    const objProvider: IProvider = {
      method: MutationTypes.POST,
      path: 'api/jobs',
      data,
    };
    const response = await provider(objProvider);
    if (!response) toast.error('Network Error');
    if (response.status === 201) {
      return response.data?.data;
    }
  } catch (e: any) {
    console.log(e, 'error createNewJob');
  }
};

export const editJob = async (data: any) => {
  try {
    const objProvider: IProvider = {
      method: MutationTypes.PUT,
      path: 'api/jobs',
      data,
    };
    const response = await provider(objProvider);
    if (!response) toast.error('Network Error');
    if (response.status === 200) {
      return response.data?.data;
    }
  } catch (e: any) {
    console.log(e, 'error editJob');
  }
};

export const deleteJob = async (id: string) => {
  try {
    const objProvider: IProvider = {
      method: MutationTypes.DELETE,
      path: 'api/jobs?id=' + id,
    };
    const response = await provider(objProvider);
    if (!response) toast.error('Network Error');
    if (response.status === 200) {
      return id;
    }
  } catch (e: any) {
    console.log(e, 'error refresh token');
  }
};
