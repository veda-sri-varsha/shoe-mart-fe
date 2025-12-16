import { axiosInstance } from "@/utils/axios";
import {
  signupPayload,
  signupResponse,
  loginPayload,
  loginResponse,
  forgotPasswordPayload,
  forgotPasswordResponse,
  getProfilePayload,
  getProfileResponse,
  logoutPayload,
  logoutResponse,
  refreshTokenResponse,
  resetPasswordPayload,
  resetPasswordResponse,
  updatePasswordPayload,
  updatePasswordResponse,
  verifyEmailPayload,
  verifyEmailResponse,
} from "@/types/index";
import {
  signupUrl,
  signinUrl,
  logoutUrl,
  verifyEmailUrl,
  forgotPasswordUrl,
  resetPasswordUrl,
  refreshTokenUrl,
  updatePasswordUrl,
  profileUrl,
} from "@/services/urls";

export const signup = async (data: signupPayload): Promise<signupResponse> => {
  const response = await axiosInstance.post(signupUrl, data);
  return response.data;
};

export const login = async (data: loginPayload): Promise<loginResponse> => {
  const response = await axiosInstance.post(signinUrl, data);
  return response.data;
};

export const logout = async (data?: logoutPayload): Promise<logoutResponse> => {
  const response = await axiosInstance.post(logoutUrl, data);
  return response.data;
};

export const verifyEmail = async (
  data: verifyEmailPayload
): Promise<verifyEmailResponse> => {
  const response = await axiosInstance.post(verifyEmailUrl, data);
  return response.data;
};

export const forgotPassword = async (
  data: forgotPasswordPayload
): Promise<forgotPasswordResponse> => {
  const response = await axiosInstance.post(forgotPasswordUrl, data);
  return response.data;
};

export const resetPassword = async (
  data: resetPasswordPayload
): Promise<resetPasswordResponse> => {
  const response = await axiosInstance.post(resetPasswordUrl, data);
  return response.data;
};

export const getProfile = async (
  data: getProfilePayload
): Promise<getProfileResponse> => {
  const response = await axiosInstance.get(`${profileUrl}/${data.userId}`);
  return response.data;
};

export const updatePassword = async (
  data: updatePasswordPayload
): Promise<updatePasswordResponse> => {
  const response = await axiosInstance.put(updatePasswordUrl, data);
  return response.data;
};

export const refreshToken = async (): Promise<refreshTokenResponse> => {
  const response = await axiosInstance.post(refreshTokenUrl);
  return response.data;
};
