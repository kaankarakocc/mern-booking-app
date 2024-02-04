import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as apiClient from "../api/api-client";
import { useMutation } from "react-query";
import useAppContext from "@/context/AppContext";
import { Link, useNavigate } from "react-router-dom";

export interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const { showToast } = useAppContext();

  const navigate = useNavigate();

  const labelStyle =
    "text-xl leading-tight w-full flex flex-col gap-1 text-slate-500";
  const inputStyle =
    "w-full p-3 border-2 rounded-md border-slate-300 focus:outline-none focus:border-blue-500 transition duration-300";
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: (response) => {
      console.log(response);
      showToast({ message: "Account created successfully", type: "success" });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "error" });
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    mutation.mutateAsync(data);
  };

  return (
    <section
      className="w-full h-full space-y-8 py-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <span className="text-4xl font-bold  text-blue-500">
          Create an account
        </span>
      </div>
      <form className="flex flex-col gap-6">
        <div className="flex flex-1 w-full flex-col gap-10 md:flex-row">
          <label className={labelStyle}>
            Firstname
            <input
              type="text"
              className={inputStyle}
              {...register("firstName", { required: "This field is required" })}
            />
            {errors.firstName && (
              <span className="text-red-500">{errors.firstName.message}</span>
            )}
          </label>

          <label className={labelStyle}>
            Lastname
            <input
              type="text"
              className={inputStyle}
              {...register("lastName", { required: "This field is required" })}
            />
            {errors.lastName && (
              <span className="text-red-500">{errors.lastName.message}</span>
            )}
          </label>
        </div>
        <label className={labelStyle}>
          Email address
          <input
            type="email"
            className={inputStyle}
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: emailPattern,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </label>
        <label className={labelStyle}>
          Password
          <input
            type="password"
            className={inputStyle}
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </label>
        <label className={labelStyle}>
          Confirm password
          <input
            type="password"
            className={inputStyle}
            {...register("confirmPassword", {
              required: "This field is required",
              validate: (value) => {
                return value === watch("password")
                  ? true
                  : "Password does not match";
              },
            })}
          />
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </label>

        <div className="flex gap-8 md:flex-row flex-col items-center">
          <p className="basis-3/4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Sign in here
            </Link>
          </p>
          <button
            type="submit"
            className="md:basis-1/4 w-full p-3 bg-blue-500 text-white rounded-md font-bold text-lg hover:bg-blue-800 transition duration-300"
          >
            Create account
          </button>
        </div>
      </form>
    </section>
  );
};

export default Register;
