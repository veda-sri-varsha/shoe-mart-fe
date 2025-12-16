const BASE_URL = "/orders";

export const generateOrderUrl = `${BASE_URL}`;
export const generateRazorPayOrderUrl = `${BASE_URL}/razorpay`;
export const verifyPaymentUrl = `${BASE_URL}/verify-payment`;
export const updateOrderUrl = (id: string) => `${BASE_URL}/${id}`;
export const updateOrderUserUrl = (id: string) => `${BASE_URL}/user/${id}`;
export const deleteOrderUrl = (id: string) => `${BASE_URL}/${id}`;
export const getAllOrdersUrl = `${BASE_URL}`;
export const getOrderAdminUrl = `${BASE_URL}/admin`;
