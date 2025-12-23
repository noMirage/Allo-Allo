export interface IUser {
    full_name: string;
    phone: string;
    email: string;
    location: string;
    age?: number;
    avatar: string | null;
}