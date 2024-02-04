import * as apiClient from "@/api/api-client";
import Toast from "@/components/Toast/Toast";
import React, { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";

type ToastType = {
  message: string;
  type: "success" | "error";
};

type AppContext = {
  showToast: (message: ToastType) => void;
  isLogin: boolean;
  refetchToken: () => void;
};

const AppContext = createContext<AppContext | undefined>({
  showToast: () => undefined,
  isLogin: false,
  refetchToken: () => undefined,
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastType | undefined>(undefined);

  const { isError, refetch } = useQuery(
    "validateToken",
    apiClient.verifyToken,
    {
      retry: false,
    }
  );

  const refetchToken = async () => {
    await refetch();
  };

  return (
    <AppContext.Provider
      value={{
        showToast: (message: ToastType) => {
          setToast(message);
        },
        isLogin: !isError,
        refetchToken,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};

export default useAppContext;
