import { TCategoryWorks } from "./works";

export type TCategory = {
  created_at: string;
  id: number;
  name: TCategoryWorks;
  slug: string;
  updated_at: string;
};

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
