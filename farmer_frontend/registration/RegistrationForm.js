"use client";

import {
  Button,
  FileInput,
  Label,
  Radio,
  Select,
  TextInput,
} from "flowbite-react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "tailwind-datepicker-react";
import axios from "axios";
import { useRouter } from "next/router";

export default function RegistrationForm() {
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const options = {
    autoHide: true,
    todayBtn: true,
    clearBtn: true,
    maxDate: new Date(),
    minDate: new Date("1950-01-01"),
    icons: {
      prev: () => (
        <svg
          className="h-4 w-4 text-gray-800 dark:text-white "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 8 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
          />
        </svg>
      ),
      next: () => (
        <svg
          className="h-4 w-4 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 8 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
          />
        </svg>
      ),
    },
    datepickerClassNames: "top-12",
    language: "en",
  };
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleChange = (selectedDate) => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const day = selectedDate.getDate();
    setSelectedDate(`${year}-${month}-${day}`);
  };
  const handleClose = (state) => {
    setShow(state);
  };
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("username", data.username);
    formData.append("gender", data.gender);
    formData.append("role", data.role);
    formData.append("dateOfBirth", selectedDate);
    formData.append("address", data.address);
    formData.append("telephoneNumber", data.telephoneNumber);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("profilePicture", data.profilePicture[0]);
    try {
      const response = await axios.post(
        "http://localhost:3000/registration",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            withCredentials: true,
          },
        },
      );
      console.log(response.data);
      if (response.data.role == "Seller") {
        console.log("hello");
        router.push("../seller/SellerDashboard");
      }
      if (response.data.role == "Farmer") {
        router.push("../member/MemberDashboard");
      }
      if (response.data.role == "Specialist") {
        router.push("../Specialist");
      }
    } catch (error) {
      if (error.code == "ERR_BAD_REQUEST") {
        console.log(error);
        setError(true);
      }
    }
  };

  return (
    <form
      className="flex w-[500px] max-w-md flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* First Name */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="first-name" value="First Name" />
        </div>
        <TextInput
          id="first-name"
          type="text"
          {...register("firstName", {
            required: "First name is required",
            minLength: {
              value: 3,
              message: "First name must be at least 3 characters long",
            },
            maxLength: {
              value: 20,
              message: "First name must not exceed 20 characters",
            },
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: "First name must contain only letters",
            },
          })}
          color={errors.firstName ? "failure" : undefined}
          helperText={
            <>{errors.firstName && <span>{errors.firstName.message}</span>}</>
          }
        />
      </div>
      {/* Last Name */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="last-name" value="Last Name" />
        </div>
        <TextInput
          id="last-name"
          type="text"
          {...register("lastName", {
            required: "Last name is required",
            minLength: {
              value: 3,
              message: "Last name must be at least 3 characters long",
            },
            maxLength: {
              value: 20,
              message: "Last name must not exceed 20 characters",
            },
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: "Last name must contain only letters",
            },
          })}
          color={errors.lastName ? "failure" : undefined}
          helperText={
            <>{errors.lastName && <span>{errors.lastName.message}</span>}</>
          }
        />
      </div>
      {/* Username */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username" value="Username" />
        </div>
        <TextInput
          id="username"
          type="text"
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 4,
              message: "Username must be at least 4 characters long",
            },
            maxLength: {
              value: 20,
              message: "Username must not exceed 20 characters",
            },
            pattern: {
              value: /^[A-Za-z0-9_]+$/,
              message:
                "Username must contain only letters, numbers, and underscores",
            },
          })}
          color={errors.username ? "failure" : undefined}
          helperText={
            <>{errors.username && <span>{errors.username.message}</span>}</>
          }
        />
      </div>
      {/* Role */}
      <div className="max-w-md" id="select">
        <div className="mb-2 block">
          <Label htmlFor="role" value="Select Your Role" />
        </div>
        <Select id="role" required {...register("role")}>
          <option value="Admin">Admin</option>
          <option value="Farmer">Farmer</option>
          <option value="Seller">Seller</option>
          <option value="Specialist">Specialist</option>
        </Select>
      </div>
      {/* Gender */}
      <div>
        <div className="mb-2 block">
          <Label value="Gender" />
        </div>
        <div>
          <label className="flex items-center gap-2">
            <Controller
              control={control}
              name="gender"
              defaultValue=""
              rules={{ required: "Gender is required" }}
              render={({ field }) => (
                <input type="radio" {...field} value="Male" />
              )}
            />
            Male
          </label>
          <label className="flex items-center gap-2">
            <Controller
              control={control}
              name="gender"
              rules={{ required: "Gender is required" }}
              render={({ field }) => (
                <input type="radio" {...field} value="Female" />
              )}
            />
            Female
          </label>
        </div>
        {errors.gender && (
          <p className="text-red-600">{errors.gender.message}</p>
        )}
      </div>
      {/* Date of Birth */}
      <div className="relative">
        <label
          htmlFor="date"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Date
        </label>
        <DatePicker
          show={show}
          setShow={handleClose}
          options={options}
          value={selectedDate}
          onChange={handleChange}
        />
      </div>
      {/* Address */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="address" value="Address" />
        </div>
        <TextInput
          id="address"
          type="text"
          {...register("address", {
            required: "Address is required",
            minLength: {
              value: 5,
              message: "Address must be at least 5 characters long",
            },
            maxLength: {
              value: 100,
              message: "Address must not exceed 100 characters",
            },
            pattern: {
              value: /^[A-Za-z0-9\s\-\.,]+$/,
              message:
                "Address must contain only letters, numbers, spaces, hyphens, periods, and commas",
            },
          })}
          color={errors.address ? "failure" : undefined}
          helperText={
            <>{errors.address && <span>{errors.address.message}</span>}</>
          }
        />
      </div>
      {/* Telephone Number */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="telephone" value="Telephone Number" />
        </div>
        <TextInput
          id="telephone"
          type="tel"
          {...register("telephone", {
            required: "Telephone number is required",
            pattern: {
              value: /^[0-9+\-\s()]+$/,
              message: "Invalid telephone number format",
            },
          })}
          color={errors.telephone ? "failure" : undefined}
          helperText={
            <>{errors.telephone && <span>{errors.telephone.message}</span>}</>
          }
        />
      </div>
      {/* Email Address */}
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
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address format",
            },
          })}
          color={errors.email ? "failure" : undefined}
          helperText={
            <>
              {errors.email && <span>{errors.email.message}</span>}
              {error && (
                <span className="text-red-600">
                  Email is already registered
                </span>
              )}
            </>
          }
        />
      </div>
      {/* Password */}
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
            <>{errors.password && <span>{errors.password.message}</span>}</>
          }
        />
      </div>
      {/* Confirm Password */}
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
              value === getValues("password") || "Passwords do not match",
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
      {/* Profile Picture */}
      <div className="max-w-md" id="fileUpload">
        <div className="mb-2 block">
          <Label htmlFor="profile-picture" value="Upload file" />
        </div>
        <FileInput
          id="profile-picture"
          {...register("profilePicture", {
            required: "File is required",
            validate: {
              fileSize: (value) => {
                if (value[0]?.size > 1024 * 1024 * 10) {
                  return "File size must be less than 1MB";
                }
                return true;
              },
              fileType: (value) => {
                if (
                  !["image/jpeg", "image/png", "application/pdf"].includes(
                    value[0]?.type,
                  )
                ) {
                  return "Supported file types are JPEG, PNG, and PDF";
                }
                return true;
              },
            },
          })}
          color={errors.profilePicture ? "failure" : undefined}
          helperText={
            <>
              {errors.profilePicture && <p>{errors.profilePicture.message}</p>}
            </>
          }
        />
      </div>
      <p class="text-sm font-light text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <a
          href="../login/Login"
          class="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Sign in
        </a>
      </p>
      <button type="submit" className="btn btn-accent btn-outline mb-10">
        Register new account
      </button>
    </form>
  );
}
