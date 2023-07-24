//QUERY
// Crea un tipo per rappresentare la risposta della query GraphQL
export interface FilmsCatLangResponse {
  films: FilmDetails[];
}

export interface CategoryResponse {
  categories: Category[];
}

export interface ActorsResponse {
  actors: Actor[];
}

export interface RentalResponse {
  rentalsByCustomer: RentalFilmPayment[];
}



//COMPONENTS

export interface Film {
  film_id: number;
  title: string;
  description: string;
  release_year: string;
  rental_duration: number;
  rental_rate: number;
  length: number;
  rating: string;
  last_update: string;
}

export interface Category {
  name: string;
}

export interface Language {
  name: string;
}

export interface Actor {
  first_name: string;
  last_name: string;
}

export interface Address {
  address: string;
}

export interface City {
  city: string;
}

export interface Tot_Films {
  total_films: number;
}

export interface Store {
  store_id: number
  manager_staff_id: number
  address_id: number
  last_update: String
}


export interface StoreOccorrency {
  store: Store
  address: Address;
  num_film: number;
}

export interface FilmCategoryStore {
  film: Film;
  category: Category;
  stores: StoreOccorrency[];
}

export interface FilmDetails {
  film: Film;
  category: Category;
  language: Language;
}

export interface Payment {
  payment_id: number;
  customer_id: number;
  rental_id: number;
  amount: number;
  payment_date: string;
}

export interface Rental {
  rental_id: number;
  rental_date: string;
  inventory_id: number;
  customer_id: number;
  return_date: string;
  staff_id: number;
  last_update: string;
}

export interface RentalFilmPayment {
  film: Film;
  address: Address;
  city: City;
  payment: Payment;
  rental: Rental;
}


