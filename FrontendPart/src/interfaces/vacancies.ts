import { TCategory } from "./works";

export interface IVacancies {
  category: TCategory;
  category_id: number;
  created_at: string;
  description: string;
  id: number;
  is_active: number;
  location: string;
  logo: string | null;
  salary: string | null;
  title: string;
  updated_at: string;
  user_id: number;
  views: number;
}
