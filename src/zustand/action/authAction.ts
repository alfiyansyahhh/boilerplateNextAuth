import provider, { IProvider } from "@/providers";
import MutationTypes from "@/providers/methods";
import axios from "axios";
import { toast } from "sonner";

export const refreshToken = async (token: any) => {
  try {
    const objProvider: IProvider = {
      method: MutationTypes.POST,
      path: "api/refresh-token",
      data: { refreshToken: token },
    };
    const response = await provider(objProvider);
    if (!response) toast.error("Network Error");
    if (response.data?.success) {
      return response.data?.tokens;
    }
  } catch (e: any) {
    console.log(e, "error refresh token");
    if (axios.isAxiosError(e)) {
      if (e?.response?.status === 401) {
        return "logout";
      }
    }
  }
};

export const registerAccount = async (data: any) => {
  try {
    const objProvider: IProvider = {
      method: MutationTypes.POST,
      path: "api/register",
      data,
    };
    const response = await provider(objProvider);
    if (!response) toast.error("Network Error");
    console.log(response, "register response");
    if (response.data?.success) {
      return response.data?.tokens;
    }
  } catch (e: any) {
    console.log(e, "error register account");
    if (axios.isAxiosError(e)) {
      toast.error(e?.response?.data?.message || "Register failed");
    }
  }
};
