"use server";

import { type ForgetPasswordActionState } from "@/app/_const/authActionState";

export const forgetPasswordAction = async (
  _prevState: ForgetPasswordActionState,
  formData: FormData,
): Promise<ForgetPasswordActionState> => {
  const email = formData.get("email");
  console.log("forget password action");
  let isSuccess = false;

  await new Promise((resolve) => setTimeout(resolve, 5000));
  isSuccess = true;

  if (!isSuccess)
    return {
      success: false,
      message: "Something went wrong. Please try again later.111",
      fieldErrors: {
        email: ["email error 111", "email error 222"],
      },
    };

  return {
    success: true,
    message: `Check your email\nIf an account exists for this email address, we’ve sent a password reset link.\nPlease check your inbox and spam folder.`,
    fieldErrors: {
      email: [],
    },
  };
};
