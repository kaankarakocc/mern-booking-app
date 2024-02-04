import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Footer = (props: Props) => {
  const textStyle = `text-white text-md font-bold tracking-tight hover:text-gray-200 transition duration-300 hover:cursor-pointer`;

  return (
    <section className="w-full bg-blue-800 py-14">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Side */}
        <div>
          <Link to={"/"}>
            <span className="text-2xl font-bold text-white tracking-tight">
              Booking.com
            </span>
          </Link>
        </div>
        {/* Links Side */}
        <div className="flex items-center justify-between gap-8 ">
          <span className={textStyle}>Privacy Policy</span>
          <span className={textStyle}>Terms and Conditions</span>
        </div>
      </div>
    </section>
  );
};

export default Footer;
