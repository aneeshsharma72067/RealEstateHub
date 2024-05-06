interface User {
  uid: string
  username: string
  firstname: string
  lastname: string
  email: string
  type: Enum('Seller', 'Buyer')
  bio: string
  created_at: Date
}

interface Property {
  property_id: string
  bhk: {
    bedroom: number
    hall: number
    kitchen: number
    bathrooms: number
  }
  price: number
  address: {
    city: string
    state: string
    landmark: string
    postalCode: number
    latitude: number
    longitude: number
  }
  floors: number
  nearByPlaces: Array<string>
  owner: User
  square_footage: number
  parking_spaces: number
  created_at: Date
  has_pool: boolean
  has_garage: boolean
  is_furnished: boolean
  description: string
  distance_to_market: number
}

interface PayingGuest {
  pg_id: string
  num_rooms_available: number
  num_rooms_total: number
  has_wifi: boolean
  has_laundry: boolean
  is_active: boolean
  has_food_included: boolean
  rent_per_room: number
  address: {
    city: string
    state: string
    landmark: string
    postalCode: number
    latitude: number
    longitude: number
  }
  distance_to_market: number
}

interface HouseForRent{
  house_id: string
  is_furnished: boolean
  has_parking: boolean
  has_pool: boolean
  pet_friendly: boolean
  is_active: boolean
  num_bedrooms: number
  num_bathrooms: number
  rent_per_month: number
  address: {
    city: string
    state: string
    landmark: string
    postalCode: number
    latitude: number
    longitude: number
  }
  distance_to_market: number
}


