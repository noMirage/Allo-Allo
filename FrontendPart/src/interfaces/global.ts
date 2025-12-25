import { ReactNode } from "react";

export type TRoutes = {
  path: string;
  element: ReactNode;
};

export type TPreviews = {
  url: string;
  files?: File;
};
