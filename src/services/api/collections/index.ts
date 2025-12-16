import { axiosInstance } from "@/utils/axios";
import {
  getAllCollectionsUrl,
  createCollectionUrl,
  updateCollectionUrl,
  deleteCollectionUrl,
} from "@/services/urls/index";
import {
  createCollectionPayload,
  createCollectionResponse,
  updateCollectionPayload,
  updateCollectionResponse,
  deleteCollectionPayload,
  deleteCollectionResponse,
  getAllCollectionsResponse,
  getCollectionPayload,
  getCollectionResponse,
  toggleCollectionStatusPayload,
  toggleCollectionStatusResponse,
} from "@/types/collections";

export const getAllCollections =
  async (): Promise<getAllCollectionsResponse> => {
    const response = await axiosInstance.get(getAllCollectionsUrl);
    return response.data;
  };

export const createCollection = async (
  data: createCollectionPayload
): Promise<createCollectionResponse> => {
  const response = await axiosInstance.post(createCollectionUrl, data);
  return response.data;
};

export const updateCollection = async (
  data: updateCollectionPayload
): Promise<updateCollectionResponse> => {
  const { id, ...payload } = data;
  const response = await axiosInstance.put(updateCollectionUrl(id), payload);
  return response.data;
};

export const deleteCollection = async (
  data: deleteCollectionPayload
): Promise<deleteCollectionResponse> => {
  const response = await axiosInstance.patch(deleteCollectionUrl(data.id));
  return response.data;
};

export const getCollectionById = async (
  data: getCollectionPayload
): Promise<getCollectionResponse> => {
  const response = await axiosInstance.get(updateCollectionUrl(data.id));
  return response.data;
};

export const toggleCollectionStatus = async (
  data: toggleCollectionStatusPayload
): Promise<toggleCollectionStatusResponse> => {
  const response = await axiosInstance.patch(updateCollectionUrl(data.id), {
    isActive: data.isActive,
  });
  return response.data;
};
