import { ReactNode } from "react";

export interface IUserInfo {
  fullName: string;
}

export type TRoutes = {
  path: string;
  element: ReactNode;
};
