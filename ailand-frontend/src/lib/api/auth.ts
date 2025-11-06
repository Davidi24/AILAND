import axiosInstance from "../axiosInstance";

export const loginUser = async (email: string, password: string) => {
  const response = await axiosInstance.post("/login", { email, password });
  return response.data;
};

export const registerUser = async (email: string, password: string, username: string) => {
  const response = await axiosInstance.post("/register", { email, password, username });
  return response.data;
};
