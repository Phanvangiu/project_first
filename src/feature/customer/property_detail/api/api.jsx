import axiosClient from "@/shared/api/axiosClient";
import { useMutation, useQuery } from "@tanstack/react-query";

export const BookingRequest = () => {
  const request = async (payload) => {
    const response = await axiosClient.post("booking/add", payload);
    return response.data;
  };

  return useMutation({
    mutationFn: request,
  });
};
export const GetPropertyRequest = (id) => {
  const request = async (id) => {
    const response = await axiosClient.get(`property?id=${id}`, {
      params: { id },
    });
    return response.data;
  };

  return useQuery({
    queryKey: ["property", id],
    queryFn: () => request(id),
  });
};
export const GetPolicies = () => {
  const request = async () => {
    const response = await axiosClient.get(`policyCM`);
    return response.data;
  };
  return useQuery({
    queryKey: ["policies"],
    queryFn: () => request(),
  });
};
