"use server";

import {
  createSigninActionInitialValue,
  MessageType,
  nestServerBaseUrl,
  nestSigninPath,
} from "@/app/_const/auth";
import { SigninActionInitialValueType } from "@/app/_types/auth";
import { redirect } from "next/navigation";

export const signinAction = async (
  previousState: SigninActionInitialValueType,
  formData: FormData,
): Promise<SigninActionInitialValueType> => {
  const currentStatus = createSigninActionInitialValue();
  const email: string = String(formData.get("email") ?? "");
  const password: string = String(formData.get("password") ?? "");

  const res = await fetch(nestServerBaseUrl + nestSigninPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  // Valid credential
  if (res.ok) redirect("/");

  const json = await res.json();

  // Credential Error
  if (!Array.isArray(json.message)) {
    currentStatus.success = res.ok;
    currentStatus.message = json.message;
  }
  // Validation Error
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
