import { IVacancies } from "./vacancies";
import { TCategory } from "./works";

export type TUserRole = "job_seeker" | "employer";

export type TResume = {
  category: TCategory;
  category_id: number;
  created_at: string;
  description: string;
  id: number;
  images: string[];
  title: string;
  updated_at: string;
  user_id: number;
};
export interface IUser {
  id: number;
  role: TUserRole;
  full_name: string;
  phone: string;
  email: string;
  age?: number;
  avatar: string | null;
  created_at: string;
  updated_at: string;
}

export interface IUserEmployer extends IUser {
  organization?: string;
  vacancies: IVacancies[];
}

export interface IUserJobSeeker extends IUser {
  role: "job_seeker";
  location: string;
  resumes: TResume[];
}
