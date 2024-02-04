import React, { useEffect } from "react";

type ToastType = {
  message: string;
  type: "success" | "error";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastType) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const toastStyle = type === "success" ? "bg-green-500" : "bg-red-500";
  const textStyle = "text-white text-lg font-semibold";
  const toastConstantStyle = `absolute top-4 right-4 w-2/12 h-[50px] flex justify-center items-center rounded-md`;

  return (
    <div className="relative">
      <div className={`${toastStyle} ${toastConstantStyle}`}>
        <span className={`${textStyle}`}>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
