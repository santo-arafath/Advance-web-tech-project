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
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "@/pages/utils/authcontext";

export default function LoginForm() {
  //const { login, user, loginUser } = useAuth();
  const router = useRouter();
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_ENDPOINT + "/login",
        data,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true,
        },
      );
      //loginUser();
      //login(response.data.email, document.cookie);
      console.log(response);
      setUser(response.data);
      if (response.data.role === "Seller") {
        router.push("../seller/SellerDashboard");
      }
      if (response.data.role === "Farmer") {
        router.push("../member/MemberDashboard");
      }
      if (response.data.role === "Specialist") {
        router.push("../Specialist");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError(true);
    }
  };

  return (
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="mx-auto flex flex-col items-center justify-center  px-6 py-8 md:h-screen lg:py-0">
        <div class="w-[500px] rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Sign in to your account
            </h1>
            <form
              class="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Email Address" />
                </div>
                <TextInput
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email address is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address format",
                    },
                  })}
                  color={errors.email ? "failure" : undefined}
                  helperText={
                    <>{errors.email && <span>{errors.email.message}</span>}</>
                  }
                />
              </div>
              <div>
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
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-start">
                  <div class="flex h-5 items-center">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      class="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                      required=""
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      class="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="./ForgotPassword"
                  class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                class="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="../registration/Registration"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
