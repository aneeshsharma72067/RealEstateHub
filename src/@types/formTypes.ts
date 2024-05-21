import { Address } from "./schemaType";

export interface SignUpFormData {
  email: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface OwnerFormData {
  phone: string;
  company?: string;
  avatar?: File | null;
}

export interface HouseFormData {
  title:string
  bedroom: number;
  hall: number;
  landmark: string;
  kitchen: number;
  bathroom: number;
  price: number;
  city: string;
  state: string;
  zipcode: string;
  address1: string;
  floors: number;
  ownerid: string;
  square_footage: number;
  parking_spaces: number;
  has_pool: boolean;
  has_garage: boolean;
  is_furnished: boolean;
  description: string;
  image: File | null;
}
