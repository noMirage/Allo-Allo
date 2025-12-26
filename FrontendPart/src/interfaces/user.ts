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
  location: string;
  age?: number;
  avatar: string | null;
  resumes: TResume[];
  created_at: string;
  updated_at: string;
}
