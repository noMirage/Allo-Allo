import { IUser, IUserJobSeeker } from "./user";
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
  user: IUserJobSeeker;
  user_id: number;
  views: number;
}