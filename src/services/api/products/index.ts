import { axiosInstance } from "@/utils/axios";
import {
  addProductUrl,
  getAllProductsUrl,
  getProductByIdUrl,
  updateProductUrl,
  deleteProductUrl,
  productsByCollectionUrl,
} from "@/services/urls/index";

import {
  createProductPayload,
  createProductResponse,
  updateProductPayload,
  updateProductResponse,
  deleteProductPayload,
  deleteProductResponse,
  getProductPayload,
  getProductResponse,
  getAllProductsPayload,
  getAllProductsResponse,
  getProductsByCollectionPayload,
  getProductsByCollectionResponse,
  searchProductsPayload,
  searchProductsResponse,
} from "@/types/index";

export const createProduct = async (
  data: createProductPayload
): Promise<createProductResponse> => {
  const response = await axiosInstance.post(addProductUrl, data);
  return response.data;
};

export const getAllProducts = async (
  params: getAllProductsPayload
): Promise<getAllProductsResponse> => {
  const response = await axiosInstance.get(getAllProductsUrl, {
    params,
  });
  return response.data;
};

export const getProductById = async (
  data: getProductPayload
): Promise<getProductResponse> => {
  const response = await axiosInstance.get(getProductByIdUrl(data.productId));
  return response.data;
};

export const updateProduct = async (
  data: updateProductPayload
): Promise<updateProductResponse> => {
  const { productId, ...payload } = data;
  const response = await axiosInstance.put(
    updateProductUrl(productId),
    payload
  );
  return response.data;
};

export const deleteProduct = async (
  data: deleteProductPayload
): Promise<deleteProductResponse> => {
  const response = await axiosInstance.delete(deleteProductUrl(data.productId));
  return response.data;
};

export const getProductsByCollection = async (
  data: getProductsByCollectionPayload
): Promise<getProductsByCollectionResponse> => {
  const response = await axiosInstance.get(
    productsByCollectionUrl(data.collectionId),
    {
      params: { page: data.page, limit: data.limit },
    }
  );
  return response.data;
};

export const searchProducts = async (
  data: searchProductsPayload
): Promise<searchProductsResponse> => {
  const response = await axiosInstance.get(getAllProductsUrl, {
    params: { query: data.query, page: data.page, limit: data.limit },
  });
  return response.data;
};
