import axiosAdmin from "@/shared/api/axiosAdmin";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

export const GetAmenityListRequest = (pageNumber, pageSize, search, status) => {
  const request = async (pageNumber, pageSize, search, status) => {
    const response = await axiosAdmin.get("amenityAD", {
      params: { pageNumber, pageSize, search, status },
    });
    return response.data;
  };

  return useQuery({
    queryKey: ["admin_amenity", pageNumber, pageSize, search, status],
    queryFn: () => request(pageNumber, pageSize, search, status),
  });
};
