import axiosClient from "@/shared/api/axiosClient";
import { useMutation } from "@tanstack/react-query";

export const LoginOrSignUpRequest = () => {
  const request = async (payload) => {
    const response = await axiosClient.post("authCM/login_signup", payload);
    return response.data;
  };

  return useMutation({
    mutationFn: request,
  });
};

export const CreateAuthenticationCodeRequest = () => {
  const request = async (payload) => {
    const response = await axiosClient.post("authCM/create_authentication_code", payload);
    return response.data;
  };

  return useMutation({
    mutationFn: request,
  });
};

export const RegisterRequest = () => {
  const request = async (payload) => {
    const response = await axiosClient.post("authCM/register", payload);
    return response.data;
  };
  return useMutation({
    mutationFn: request,
  });
};

export const LoginRequest = () => {
  const request = async (payload) => {
    const response = await axiosClient.post("authCM/login", payload);
    return response.data;
  };
  return useMutation({
    mutationFn: request,
  });
};
