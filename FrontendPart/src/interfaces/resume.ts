import { IUser } from "./user";
import { TCategory } from "./works";

export interface IResume {
  category: TCategory;
  category_id: number;
  created_at: string;
  description: string;
  id: number;
  images: string[];
  title: string;
  updated_at: string;
  user: Omit<IUser, "resumes" | "created_at" | "updated_at">;
  user_id: number;
}