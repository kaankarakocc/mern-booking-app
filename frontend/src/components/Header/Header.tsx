import useAppContext from "@/context/AppContext";
import React from "react";
import { Link } from "react-router-dom";
import * as apiClient from "@/api/api-client";
import { useMutation } from "react-query";

type Props = {};

const Header = (props: Props) => {
  const { isLogin, refetchToken, showToast } = useAppContext();

  const buttonsStyle = `px-4 py-2 bg-white rounded flex items-center justify-center hover:bg-gray-200 transition duration-300 ease-in-out`;
  const buttonTextStyle = `text-blue-800 tracking-tight text-md`;

  const linkBoxStyle = `hover:bg-blue-500 transition duration-300 ease-in-out w-32 h-12 flex items-center justify-center rounded`;
  const linkStyle = `text-white tracking-tight text-lg`;

  const mutation = useMutation(apiClient.logout, {
    onSuccess: () => {
      showToast({ type: "success", message: "Logout successfully" });
    },
    onError: (error: Error) => {
      showToast({ type: "error", message: error.message });
    },
  });

  const handleLogout = async () => {
    await mutation
      .mutateAsync()
      .then(() => {
        refetchToken();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="w-full bg-blue-800 py-2">
      <div className="container mx-auto flex justify-between">
        {/* Logo */}
        <div className="w-full">
          <Link to={"/"}>
            <span className="text-2xl font-bold text-white tracking-tight">
              Booking.com
            </span>
          </Link>
        </div>
        {/* Buttons,Links */}
        {isLogin && (
          <div className="flex justify-between w-4/6 items-center gap-8">
            <div className="flex flex-row gap-8">
              <Link to="/bookings" className={linkBoxStyle}>
                <span className={linkStyle}>My Bookings</span>
              </Link>
              <Link to="/hotels" className={linkBoxStyle}>
                <span className={linkStyle}>Hotels</span>
              </Link>
            </div>
            <Link to="/login" onClick={handleLogout} className={buttonsStyle}>
              <span className={buttonTextStyle}>Logout</span>
            </Link>
          </div>
        )}
        {!isLogin && (
          <div className="flex justify-end w-1/2 items-center gap-8">
            <Link to="/register" className={buttonsStyle}>
              <span className={buttonTextStyle}>Register</span>
            </Link>
            <Link to="/login" className={buttonsStyle}>
              <span className={buttonTextStyle}>Sign in</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Header;
