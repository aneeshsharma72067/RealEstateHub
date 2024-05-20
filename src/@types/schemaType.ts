import { FieldValue } from "firebase/firestore";

export interface User {
  uid: string;
  username?: string;
  firstname?: string;
  lastname?: string;
  email: string;
  bio?: string;
  created_at: FieldValue;
  ownerid?: string;
}

export interface Owner {
  ownerid: string;
  uid: string;
  phoneNumber: string;
  company?: string;
  avatarUrl?: string;
  properties: {
    houses: string[];
    pg: string[];
    rental: string[];
    plots: string[];
  };
}

export interface Address {
  city: string;
  state: string;
  landmark: string;
  postalCode: number;
  latitude: number;
  longitude: number;
  address1?: string;
  address2?: string;
}

export interface House {
  house_id: string;
  bhk: {
    bedroom: number;
    hall: number;
    kitchen: number;
    bathrooms: number;
  };
  price: number;
  address: Address;
  floors: number;
  amenities: string[];
  ownerid: string;
  square_footage: number;
  parking_spaces: number;
  created_at: Date;
  has_pool: boolean;
  has_garage: boolean;
  is_furnished: boolean;
  description: string;
  images?: string[];
  distance_to_market: number;
}

export interface PG {
  pg_id: string;
  num_rooms_available: number;
  num_rooms_total: number;
  has_wifi: boolean;
  has_laundry: boolean;
  is_active: boolean;
  has_food_included: boolean;
  rent_per_room: number;
  address: Address;
  ownerid: string;
  amenities: string[];
  images?: string[];
  distance_to_market: number;
}

export interface Rental {
  renthouse_id: string;
  is_furnished: boolean;
  has_parking: boolean;
  has_pool: boolean;
  pet_friendly: boolean;
  is_active: boolean;
  num_bedrooms: number;
  num_bathrooms: number;
  rent_per_month: number;
  address: Address;
  distance_to_market: number;
  images?: string[];
  amenities: string[];
  ownerid: string;
}

export interface Plot {
  plot_id: string;
  address: Address;
  area: number;
  description: string;
  price: number;
  ownerid: string;
  amenities: string[];
  images?: string[];
}
