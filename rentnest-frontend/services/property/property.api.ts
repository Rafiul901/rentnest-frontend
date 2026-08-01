import axiosInstance from "@/lib/axios";

export const getProperties = async () => {
  const { data } = await axiosInstance.get("/properties");
  return data;
};