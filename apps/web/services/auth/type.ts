export enum Role {
  REALTOR = "REALTOR",
  USER = "USER",
}

export type SignInPayload = {
  email: string;
  password: string;
};

export type SignUpPayload = SignInPayload;

export type SignInResponse = {
  accessToken: string;
  user: TUser;
};

export type SignUpResponse = SignInResponse;

export type TUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
};
