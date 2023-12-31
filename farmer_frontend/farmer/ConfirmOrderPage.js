"use client";

import SellerSidebar from "@/components/SellerSidebar";
import { Button, Label, TextInput, FileInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

const ConfirmOrderPage = () => {
  const router = useRouter();
  const { query } = router;
  const [jsonData, setJSONData] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/member/confirmorder/1`,
        {
          withCredentials: true,
        },
      );
      setJSONData(response.data);
      console.log(jsonData);
      router.push("./Cart");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex items-start justify-start">
      <SellerSidebar />
      <form
        className="flex w-1/2 max-w-md flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Amount */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="amount" value="Amount" />
          </div>
          <TextInput
            id="amount"
            type="text"
            {...register("amount", {
              required: "amount is required",
              minLength: {
                value: 3,
                message: "amount must be at least 3 characters long",
              },
            })}
            color={errors.amount ? "failure" : undefined}
            helperText={
              <>{errors.amount && <span>{errors.amount.message}</span>}</>
            }
          />
        </div>
        {/* currency */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="currency" value="Currency" />
          </div>
          <TextInput
            id="currency"
            type="text"
            {...register("currency", {
              required: "currency is required",
              minLength: {
                value: 3,
                message: "currency must be at least 3 characters long",
              },
            })}
            color={errors.currency ? "failure" : undefined}
            helperText={
              <>{errors.currency && <span>{errors.currency.message}</span>}</>
            }
          />
        </div>
        {/* paymentMethod */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="paymentMethod" value="Payment Method" />
          </div>
          <TextInput
            id="paymentMethod"
            type="text"
            {...register("paymentMethod", {
              required: "paymentMethod is required",
              minLength: {
                value: 3,
                message: "paymentMethod must be at least 3 characters long",
              },
            })}
            color={errors.paymentMethod ? "failure" : undefined}
            helperText={
              <>
                {errors.paymentMethod && (
                  <span>{errors.paymentMethod.message}</span>
                )}
              </>
            }
          />
        </div>
        <Button type="submit">Confirm Order</Button>
      </form>
    </div>
  );
};

export default ConfirmOrderPage;
