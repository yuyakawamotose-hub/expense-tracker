"use server";

import {
  createSigninActionInitialValue,
  MessageType,
  nestServerBaseUrl,
  nestSigninPath,
} from "@/app/_const/auth";
import { SigninActionInitialValueType } from "@/app/_types/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signinAction = async (
  previousState: SigninActionInitialValueType,
  formData: FormData,
): Promise<SigninActionInitialValueType> => {
  console.log("signin next");
  const currentStatus = createSigninActionInitialValue();
  const email: string = String(formData.get("email") ?? "");
  const password: string = String(formData.get("password") ?? "");

  const res = await fetch(nestServerBaseUrl + nestSigninPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  // Valid credential
  // Set Jwt to Cookie
  if (res.ok) {
    const cookieStore = await cookies();
    const { accessToken } = await res.json();

    cookieStore.set("access_token", accessToken, {
      httpOnly: true,
      secure: false, // localhost 開発中
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    redirect("/");
  }

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
