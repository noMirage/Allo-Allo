import { ReactNode } from "react";

export interface IUserInfo {
  fullName: string;
  phone: string;
  email: string | null;
  [key: string]: string | null;
}