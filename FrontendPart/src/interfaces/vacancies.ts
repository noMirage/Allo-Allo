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
  organization: string;
  views: number;
}

export interface IVacancyDetails {
  created_at: string;
  description: string;
  employer: {
    avatar: string | null;
    email: string;
    full_name: string;
    id: number;
    organization: string;
    phone: string;
  };
  id: number;
  location: string;
  logo: string | null;
  salary: string | null;
  title: string;
}

export interface IVacancyPaginationList {
  current_page: number;
  vacancies: IVacancies[];
  last_page: number;
  per_page: number;
  total: 2;
}
