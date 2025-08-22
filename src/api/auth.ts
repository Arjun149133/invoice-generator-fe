import axios from "axios";

export const backendURL = "https://invoice-generator-be-ten.vercel.app";
// src/api/auth.ts
export const registerUser = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  const res = await axios.post(`${backendURL}/api/auth/register`, data);
  return res.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await axios.post(`${backendURL}/api/auth/login`, data);
  return res.data;
};
