import { redirect } from "next/navigation";

export type signinActionInitialValueType = {
  success: boolean;
  message: string;
  fieldErrors: {
    email: string[];
    password: string[];
  };
};

export const signinActionInitialValue: signinActionInitialValueType = {
  success: true,
  message: "",
  fieldErrors: {
    email: [],
    password: [],
  },
};

export const signinAction = async (): Promise<signinActionInitialValueType> => {
  console.log("signin action");
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
      },
    };

  redirect("/");
};
