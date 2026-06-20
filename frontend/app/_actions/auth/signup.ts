import { signinPagePath } from "@/app/_const/auth";
import { redirect } from "next/navigation";

export type signupActionInitialValueType = {
  success: boolean;
  message: string;
  fieldErrors: {
    email: string[];
    password: string[];
    confirmPassword: string[];
  };
};

export const signupActionInitialValue: signupActionInitialValueType = {
  success: true,
  message: "",
  fieldErrors: {
    email: [],
    password: [],
    confirmPassword: [],
  },
};

export const signupAction = async (): Promise<signupActionInitialValueType> => {
  console.log("signup action");
  let isSuccess = false;

  await new Promise((resolve) => setTimeout(resolve, 5000));
  isSuccess = true;

  if (!isSuccess)
    return {
      success: false,
      message: "Something went wrong. Please try again later.111",
      fieldErrors: {
        email: ["email error 111", "email error 222"],
        password: ["password error 111", "password error 222"],
        confirmPassword: [
          "confirm password error 111",
          "confirm password error 222",
        ],
      },
    };

  redirect(signinPagePath);
};
