import { axiosInstance } from '@/src/services/axios';
import {
  signupUrl,
  signinUrl,
  logoutUrl,
  forgotPasswordUrl,
  resetPasswordUrl,
  verifyEmailUrl,
  refreshTokenUrl,
} from "../../urls/auth";

import {
  signupPayload,
  signupResponse,
  loginPayload,
  loginResponse,
  logoutPayload,
  logoutResponse,
  verifyEmailPayload,
  verifyEmailResponse,
  forgotPasswordPayload,
  forgotPasswordResponse,
  resetPasswordPayload,
  resetPasswordResponse,
  getProfilePayload,
  getProfileResponse,
  updatePasswordPayload,
  updatePasswordResponse,
  refreshTokenResponse,
} from '../../../types/auth';

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


export const verifyEmail = async (data: verifyEmailPayload): Promise<verifyEmailResponse> => {
  const response = await axiosInstance.post(verifyEmailUrl, data);
  return response.data;
};


export const forgotPassword = async (data: forgotPasswordPayload): Promise<forgotPasswordResponse> => {
  const response = await axiosInstance.post(forgotPasswordUrl, data);
  return response.data;
};


export const resetPassword = async (data: resetPasswordPayload): Promise<resetPasswordResponse> => {
  const response = await axiosInstance.post(resetPasswordUrl, data);
  return response.data;
};


export const getProfile = async (data: getProfilePayload): Promise<getProfileResponse> => {
  const response = await axiosInstance.get(`/auth/profile/${data.userId}`);
  return response.data;
};


export const updatePassword = async (data: updatePasswordPayload): Promise<updatePasswordResponse> => {
  const response = await axiosInstance.put(`/auth/update-password`, data);
  return response.data;
};


export const refreshToken = async (): Promise<refreshTokenResponse> => {
  const response = await axiosInstance.post(refreshTokenUrl);
  return response.data;
};
