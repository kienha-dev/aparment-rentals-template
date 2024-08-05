"use client";

import { $api } from "../axios";
import { SignInPayload, SignInResponse, SignUpPayload, TUser } from "./type";

const signIn = async (
  signInPayload: SignInPayload
): Promise<SignInResponse> => {
  const { data } = await $api.post<SignInResponse>("/auth/sign-in", {
    ...signInPayload,
  });
  return data;
};

const signUp = async (
  signUpPayload: SignUpPayload
): Promise<SignInResponse> => {
  const { data } = await $api.post<SignInResponse>("/auth/sign-up", {
    ...signUpPayload,
  });
  return data;
};

const currentUser = async (): Promise<TUser | null> => {
  try {
    const { data } = await $api.get<TUser>("/user/me");
    return data;
  } catch (err) {
    return null;
  }
};

export { signIn, signUp, currentUser };
