"use client";

import {
  Button,
  Checkbox,
  FileInput,
  Label,
  Radio,
  Select,
  TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "@/pages/utils/authcontext";
import { redirect } from "next/dist/server/api-utils";

export default function ForgotPasswordForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  useEffect(async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/member/sendcode",
        {
          withCredentials: true,
        },
      );
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onSubmit = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/member/showprofiledetails",
        {
          withCredentials: true,
        },
      );
      console.log(response.data);
      router.push("./Login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="mx-auto flex flex-col items-center justify-center  px-6 py-8 md:h-screen lg:py-0">
        <div class="w-[500px] rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Change Password
            </h1>
            <form
              class="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Username */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="code" value="Code" />
                </div>
                <TextInput
                  id="code"
                  type="text"
                  {...register("code", {
                    required: "code is required",
                    minLength: {
                      value: 4,
                      message: "code must be at least 4 characters long",
                    },
                    maxLength: {
                      value: 20,
                      message: "code must not exceed 20 characters",
                    },
                    pattern: {
                      value: /^[A-Za-z0-9_]+$/,
                      message:
                        "code must contain only letters, numbers, and underscores",
                    },
                  })}
                  color={errors.code ? "failure" : undefined}
                  helperText={
                    <>{errors.code && <span>{errors.code.message}</span>}</>
                  }
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Password" />
                </div>
                <TextInput
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    // minLength: {
                    //   value: 8,
                    //   message: "Password must be at least 8 characters long",
                    // },
                    // pattern: {
                    //   value:
                    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                    //   message:
                    //     "Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character",
                    // },
                  })}
                  color={errors.password ? "failure" : undefined}
                  helperText={
                    <>
                      {errors.password && (
                        <span>{errors.password.message}</span>
                      )}
                      {error && (
                        <span className="text-red-600">
                          Password does not match
                        </span>
                      )}
                    </>
                  }
                />
              </div>
              <div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="confirmPassword" value="Confirm Password" />
                  </div>
                  <TextInput
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === getValues("password") ||
                        "Passwords do not match",
                    })}
                    color={errors.confirmPassword ? "failure" : undefined}
                    helperText={
                      <>
                        {errors.confirmPassword && (
                          <span>{errors.confirmPassword.message}</span>
                        )}
                      </>
                    }
                  />
                </div>
              </div>
              <button
                type="submit"
                class="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
