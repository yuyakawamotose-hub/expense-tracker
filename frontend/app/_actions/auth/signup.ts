"use server";

import {
  nestServerBaseUrl,
  nestSignupPath,
  signinPagePath,
} from "@/app/_const/auth";
import { createSignupActionInitialValue } from "@/app/_const/auth";
import { SignupActionInitialValueType } from "@/app/_types/auth";
import { redirect } from "next/navigation";

import { MessageType } from "@/app/_const/auth";

export const signupAction = async (
  previousState: SignupActionInitialValueType,
  formData: FormData,
): Promise<SignupActionInitialValueType> => {
  const currentStatus = createSignupActionInitialValue();
  const email: string = String(formData.get("email") ?? "");
  const password: string = String(formData.get("password") ?? "");
  const confirmPassword: string = String(formData.get("confirmPassword") ?? "");

  if (password !== confirmPassword) {
    currentStatus.fieldErrors.confirmPassword.push(
      "Confirm password is not match with password",
    );

    return currentStatus;
  }

  const res = await fetch(nestServerBaseUrl + nestSignupPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (res.ok) redirect(signinPagePath);

  currentStatus.success = res.ok;

  const json = await res.json();

  if (!Array.isArray(json.message)) currentStatus.message = json.message;
  else {
    if (json.message.length > 0) {
      for (const message of json.message) {
        if (message.toLowerCase().includes(MessageType.EMAIL)) {
          currentStatus.fieldErrors[MessageType.EMAIL].push(message);
          continue;
        }
        if (message.toLowerCase().includes(MessageType.PASSWORD)) {
          currentStatus.fieldErrors[MessageType.PASSWORD].push(message);
          continue;
        }
      }
    }
  }

  return currentStatus;
};
