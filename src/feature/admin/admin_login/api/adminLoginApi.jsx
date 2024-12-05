import axiosAdmin from "@/shared/api/axiosAdmin";
import { useMutation } from "@tanstack/react-query";

export const AdminLoginRequest = () => {
  const request = async (payload) => {
    const response = await axiosAdmin.post("authAD", payload);
    return response.data;
  };

  return useMutation({
    mutationFn: request,
  });
};
