// lib/request.ts
import axios, { AxiosInstance } from "axios";
import { cookies } from "next/headers";

export default async function createRequest(): Promise<AxiosInstance> {
  const cookieStore = await cookies(); // không cần await nếu không dùng ở Edge
  const token = cookieStore.get("token")?.value;

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    withCredentials: true,
    withXSRFToken: true,
  });

  return instance;
}
