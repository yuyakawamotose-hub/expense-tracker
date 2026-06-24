import {
  SigninActionInitialValueType,
  SignupActionInitialValueType,
} from "../_types/auth";

export const signupPagePath = "/auth/signup";
export const signinPagePath = "/auth/signin";
export const forgetPasswordPagePath = "/auth/forget-password";

export const nestServerBaseUrl = process.env.NEST_SERVER_BASE_URL || "";
export const nestSignupPath = process.env.NEST_SIGNUP_PATH || "";
export const nestSigninPath = process.env.NEST_SIGNIN_PATH || "";
export const nestGetMePath = process.env.NEST_GET_ME_PATH || "";

// Action initial value
export const createSignupActionInitialValue =
  (): SignupActionInitialValueType => ({
    success: null,
    message: "",
    fieldErrors: {
      email: [],
      password: [],
      confirmPassword: [],
    },
  });

export const createSigninActionInitialValue =
  (): SigninActionInitialValueType => ({
    success: null,
    message: "",
    fieldErrors: {
      email: [],
      password: [],
    },
  });

export enum MessageType {
  EMAIL = "email",
  PASSWORD = "password",
}
