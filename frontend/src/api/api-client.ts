import { IloginInput } from "@/pages/Login";
import { IFormInput } from "@/pages/Register";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export const register = async (formData: IFormInput) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    if (response.status !== 200) {
      throw new Error("An error occurred while registering");
    }

    return await response.json();
  } catch (error) {
    throw new Error("An unexpected error occurred");
  }
};

export const login = async (formData: IloginInput) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    if (response.status !== 200) {
      throw new Error("An error occurred while logging in");
    }

    return await response.json();
  } catch (error) {
    throw new Error("An unexpected error occurred");
  }
};

export const verifyToken = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
      method: "GET",
      credentials: "include",
    });

    if (response.status !== 200) {
      throw new Error("An error occurred while validating token");
    }

    return await response.json();
  } catch (error) {
    throw new Error("An unexpected error occurred");
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "GET",
      credentials: "include",
    });

    if (response.status !== 200) {
      throw new Error("An error occurred while logging out");
    }

    return await response.json();
  } catch (error) {
    throw new Error("An unexpected error occurred");
  }
};
