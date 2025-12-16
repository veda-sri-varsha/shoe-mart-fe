import { axiosInstance } from "@/utils/axios";
import {
  generateOrderUrl,
  generateRazorPayOrderUrl,
  verifyPaymentUrl,
  updateOrderUrl,
  updateOrderUserUrl,
  deleteOrderUrl,
  getAllOrdersUrl,
  getOrderAdminUrl,
} from "@/services/urls/orders";
import {
  generateRazorPayOrderIdPayload,
  generateRazorPayOrderIdResponse,
  createOrderPayload,
  createOrderResponse,
  getOrdersResponse,
  getOrderAdminResponse,
  updateOrderStatusPayload,
  updateOrderStatusResponse,
  deleteOrderPayload,
  deleteOrderResponse,
  verifyPaymentPayload,
  verifyPaymentResponse,
} from "@/types/orders";

export const generateRazorPayOrderId = async (
  data: generateRazorPayOrderIdPayload
): Promise<generateRazorPayOrderIdResponse> => {
  const response = await axiosInstance.post(generateRazorPayOrderUrl, data);
  return response.data;
};

export const createOrder = async (
  data: createOrderPayload
): Promise<createOrderResponse> => {
  const response = await axiosInstance.post(generateOrderUrl, data);
  return response.data;
};

export const getAllOrders = async (): Promise<getOrdersResponse> => {
  const response = await axiosInstance.get(getAllOrdersUrl);
  return response.data;
};

export const verifyPayment = async (
  data: verifyPaymentPayload
): Promise<verifyPaymentResponse> => {
  const response = await axiosInstance.post(verifyPaymentUrl, data);
  return response.data;
};

export const getOrderAdmin = async (
  id: string
): Promise<getOrderAdminResponse> => {
  const response = await axiosInstance.get(getOrderAdminUrl(id));
  return response.data;
};

export const updateOrderStatus = async (
  data: updateOrderStatusPayload
): Promise<updateOrderStatusResponse> => {
  const { id, ...payload } = data;
  const response = await axiosInstance.put(updateOrderUrl(id), payload);
  return response.data;
};

export const updateOrderByUser = async (
  data: updateOrderStatusPayload
): Promise<updateOrderStatusResponse> => {
  const { id, ...payload } = data;
  const response = await axiosInstance.put(updateOrderUserUrl(id), payload);
  return response.data;
};

export const deleteOrder = async (
  data: deleteOrderPayload
): Promise<deleteOrderResponse> => {
  const response = await axiosInstance.delete(deleteOrderUrl(data.id));
  return response.data;
};
