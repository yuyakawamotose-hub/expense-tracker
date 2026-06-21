export type SignupActionInitialValueType = {
  success: boolean | null;
  message: string;
  fieldErrors: {
    email: string[];
    password: string[];
    confirmPassword: string[];
  };
};

export type SigninActionInitialValueType = {
  success: boolean | null;
  message: string;
  fieldErrors: {
    email: string[];
    password: string[];
  };
};
