"use client";

import SellerSidebar from "@/components/SellerSidebar";
import { Button, Label, TextInput, FileInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import MemberSidebar from "../components/MemberSidebar";

export default function PublishBlogsPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.shopName);
    formData.append("content", data.shopLocation);
    formData.append("blogPicture", data.shopPicture[0]);

    try {
      const response = await axios.post(
        "http://localhost:3000/member/publishblog",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data", // Move this line here
          },
        },
      );

      console.log(response.data);
      router.push("./ReadBlogs");
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div className="flex items-start justify-start">
      <MemberSidebar />
      <form
        className="flex w-1/2 max-w-md flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* First Name */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="shop-name" value="Title" />
          </div>
          <TextInput
            id="shop-name"
            type="text"
            {...register("shopName", {
              required: "Title is required",
              minLength: {
                value: 3,
                message: "Shop name must be at least 3 characters long",
              },
            })}
            color={errors.shopName ? "failure" : undefined}
            helperText={
              <>{errors.shopName && <span>{errors.shopName.message}</span>}</>
            }
          />
        </div>
        {/* Last Name */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="shop-location" value="Content" />
          </div>
          <TextInput
            id="shop-location"
            type="text"
            {...register("shopLocation", {
              required: "Content is required",
              minLength: {
                value: 3,
                message: "Shop Location must be at least 3 characters long",
              },
            })}
            color={errors.shopLocation ? "failure" : undefined}
            helperText={
              <>
                {errors.shopLocation && (
                  <span>{errors.shopLocation.message}</span>
                )}
              </>
            }
          />
        </div>
        {/* Profile Picture */}
        <div className="max-w-md" id="fileUpload">
          <div className="mb-2 block">
            <Label htmlFor="shop-picture" value="Upload file" />
          </div>
          <FileInput
            id="shop-picture"
            {...register("shopPicture", {
              required: "File is required",
              validate: {
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
          />
          {errors.shopPicture && <p>{errors.shopPicture.message}</p>}
        </div>
        <Button type="submit">Publish Blogs</Button>
      </form>
    </div>
  );
}
