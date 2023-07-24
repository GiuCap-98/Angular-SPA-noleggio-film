const { gql } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { db_rent, db_user } = require('./db');
const { SECRET } = require('./db'); 

// Schema GraphQL
const typeDefs = gql`

  type Customer {
    customer_id: ID!
    store_id: ID
    first_name: String
    last_name: String
    email: String
    address_id: ID
    activebool: Boolean
    create_date: String
    last_update: String
    active: Boolean    
  }

  type Film {
    film_id: ID!
    title: String
    description: String
    release_year: String
    language_id: Int
    rental_duration: Int
    rental_rate: Float
    length: Int
    replacement_cost: Float
    rating: String
    last_update: String
    special_features: String
    fulltext: String
  }

  type Category {
    category_id: ID!
    name: String
    last_update: String
  }

  type Language{
    language_id: ID!
    name: String
    last_update: String
  }
  type Actor{
    actor_id: ID!
    first_name: String
    last_name: String
    last_update: String
  }

  type Address {
    address_id: ID!
    address: String
    address2: String
    district: String
    city_id: ID
    postal_code: Int
    phone: Int
    last_update: String
  }

  type City {
    city_id: ID!
    city: String
    country_id: ID
    last_update: String
  }
    
  type Store{
    store_id: ID!
    manager_staff_id: ID
    address_id: ID
    last_update: String
  }


  type Rental {
    rental_id: ID!
    rental_date: String
    inventory_id: ID!
    customer_id: ID!
    return_date: String
    staff_id: ID
    last_update: String
    
  }

  
  type Rental_FilmPaymant {
    film: Film
    address: Address
    city: City
    payment: Payment
    rental:Rental
  }


  type Payment {
    payment_id: ID!
    customer_id: ID!
    rental_id: ID!
    amount: Float!
    payment_date: String
  }

  type Films_Details {
    film: Film
    category: Category
    language: Language
  }


  type StoreOccorrency{
    store: Store
    address: Address
    num_film: Float
  }

  type User {
    customer_id: ID!
    first_name: String
    last_name: String
    email: String!
    password: String!
  }
  
  type Query {
    totalFilms(searchCat: String!, searchTerm: String!): Int
    films(searchCat: String!, searchTerm: String!, page: Int, pageSize: Int): [Films_Details]
    categories: [Category]
    searchActorsByFilm(film_id: ID!): [Actor]
    stores(film_id: ID!): [StoreOccorrency]
    rentalsByCustomer(customerId: ID!): [Rental_FilmPaymant]
  }

  type Mutation {
    register(customer_id: ID!, first_name: String!, last_name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): String!
  }
`;

// Resolver per Query e Mutation GraphQL
const resolvers = {

  Query: {
    totalFilms: async (_, { searchCat, searchTerm}) => {
      try {
        let query = '';
        let values = [];
        
    
        if (!searchCat) {
          query = `
          SELECT COUNT(*) AS total_films FROM film f
          JOIN film_category f_cat ON f_cat.film_id = f.film_id
          JOIN language lang ON lang.language_id= f.language_id
          JOIN category cat ON cat.category_id = f_cat.category_id
          WHERE f.title ILIKE '%' || $1 || '%'
          
          `;
          
          values= [searchTerm]
        }else{
          query = `
          SELECT COUNT(*) AS total_films FROM film f
          JOIN film_category f_cat ON f_cat.film_id = f.film_id
          JOIN language lang ON lang.language_id= f.language_id
          JOIN category cat ON cat.category_id = f_cat.category_id
          WHERE f.title ILIKE '%' || $1 || '%' AND cat.name= $2
          
          `;
          
          values= [searchTerm, searchCat]
        }

        const result = await db_rent.query(query, values);

        return result.rows[0].total_films;
      } catch (error) {
        console.error('Errore durante l\'esecuzione della query:', error);
        throw new Error('Errore del server');
      }
    },

    films: async (_, { searchCat, searchTerm, page, pageSize }, {customer_id}) => {

      if(!customer_id){
        return
      }

      try {
        const offset = (page - 1) * pageSize;
        const limit = pageSize;
    
        let query = '';
        let values = [];
        
    
        if (!searchCat) {
          query = `
            SELECT f.film_id, f.title, f.description, f.release_year, f.rental_duration, f.rental_rate, f.length, f.rating, f.last_update, 
              lang.name as language_name, cat.name as category_name
            FROM film f
            JOIN film_category f_cat ON f_cat.film_id = f.film_id
            JOIN language lang ON lang.language_id= f.language_id
            JOIN category cat ON cat.category_id = f_cat.category_id
            WHERE f.title ILIKE '%' || $1 || '%'
            ORDER BY f.film_id
            OFFSET $2 LIMIT $3
          `;
          values= [searchTerm,offset, limit]
        }else{
          query = `
          SELECT f.film_id, f.title, f.description, f.release_year, f.rental_duration, f.rental_rate, f.length, f.rating, f.last_update, 
            lang.name as language_name, cat.name as category_name
          FROM film f
          JOIN film_category f_cat ON f_cat.film_id = f.film_id
          JOIN language lang ON lang.language_id= f.language_id
          JOIN category cat ON cat.category_id = f_cat.category_id
          WHERE f.title ILIKE '%' || $1 || '%' AND cat.name= $4
          ORDER BY f.film_id
          OFFSET $2 LIMIT $3
          `;
          values = [searchTerm,offset, limit, searchCat]
        }
    
        const result = await db_rent.query(query, values);
    
        const film_obj = result.rows.map(row => ({
          film: { 
            film_id: row.film_id,
            title: row.title,
            description: row.description,
            release_year: row.release_year,
            rental_duration: row.rental_duration,
            rental_rate: row.rental_rate,
            length: row.length,
            rating: row.rating,
            last_update: row.last_update
          },
          category: { name: row.category_name },
          language: { name: row.language_name }
        }));
    
        return film_obj;
      } catch (error) {
        console.error('Errore durante l\'esecuzione della query:', error);
        throw new Error('Errore del server');
      }
    },
 
    categories: async (_, __,) => {
      try {
        const client = await db_rent.connect();
        const result = await client.query('SELECT name FROM category');
        return result.rows;
      } 
      
      catch (error) {
        console.error('Errore durante l\'esecuzione della query:', error);
        throw new Error('Errore del server');
      }
    },

    searchActorsByFilm: async (_, { film_id }) => {
      try {
        const query = `
        SELECT act.first_name, act.last_name 
        FROM actor act
        JOIN film_actor f_act ON f_act.actor_id = act.actor_id
        JOIN film f ON f.film_id = f_act.film_id
        WHERE f.film_id= $1
        `;
        const result = await db_rent.query(query, [film_id]); 
        
        return result.rows;
        
      } 
      
      catch (error) {
        console.error('Errore durante l\'esecuzione della query:', error);
        throw new Error('Errore del server');
      }
    },

    stores: async (_, { film_id }) => {
      try {
        const query = `
        SELECT s.store_id, addr.address, COALESCE(COUNT(i.film_id), 0) AS num_film
        FROM store s
        JOIN address addr ON s.address_id = addr.address_id
        LEFT JOIN inventory i ON s.store_id = i.store_id AND i.film_id = $1
        LEFT JOIN rental r ON i.inventory_id = r.inventory_id AND r.return_date IS NULL
        WHERE r.inventory_id IS NULL
        GROUP BY addr.address, s.store_id;
        `;
        const result = await db_rent.query(query, [film_id]); 
        const stores = result.rows.map(row => ({
          store: { store_id: row.store_id },
          address: { address: row.address },
          num_film: row.num_film
        }));
        
        return stores;
        
      } 
      
      catch (error) {
        console.error('Errore durante l\'esecuzione della query:', error);
        throw new Error('Errore del server');
      }
    },
    
    rentalsByCustomer: async (_, { customerId }, {customer_id}) => {
      if(!customer_id){
        return
      }
      try{
        const query = `
        SELECT f.title, p.amount,to_char( p.payment_date, 'DD/MM/YYYY') as payment_date,
            to_char(r.return_date, 'DD/MM/YYYY') as return_date,
            to_char(r.rental_date, 'DD/MM/YYYY') as rental_date,
            r.rental_id, addr.address, cit.city
        FROM film f
        JOIN inventory i ON f.film_id = i.film_id
        JOIN rental r ON i.inventory_id = r.inventory_id
        LEFT JOIN payment p ON r.rental_id = p.rental_id
        LEFT JOIN customer cust ON cust.customer_id = p.customer_id
        LEFT JOIN address addr ON addr.address_id = cust.address_ID
        LEFT JOIN city cit ON cit.city_id= addr.city_id
        WHERE r.customer_id = $1 AND p.amount is not NULL
        ORDER BY r.rental_date DESC;
        `;
        const result = await db_rent.query(query, [customerId]);
        
        const rentals = result.rows.map(row => ({
          film: { title: row.title },
          address: { address: row.address },
          city: {city: row.city},
          payment: { amount: row.amount, payment_date: row.payment_date },
          rental: {
            rental_date: row.rental_date,
            return_date: row.return_date,
            rental_id: row.rental_id
          }
          
        }));
        
        return rentals; 
      }catch{
        console.error('Errore durante l\'esecuzione della query:', error);
        throw new Error('Errore del server');
      }     
    },

    
     
  },

  Mutation: {
    register: async (_, { customer_id, first_name, last_name, email, password }) => {
      try {
        // Verifica se l'utente esiste già nel database
        const queryCheckUser = `
          SELECT email FROM user_app WHERE email = $1;
        `;
        const existingUser = await db_user.query(queryCheckUser, [email]);
  
        if (existingUser.rows.length > 0) {
          throw new Error('Utente già registrato con questa email');
        }
  
        // Genera l'hash della password
        const hashedPassword = await bcrypt.hash(password, 12);
  
        // Inserisci l'utente nel database
        const queryInsertUser = `
          INSERT INTO user_app (customer_id, first_name, last_name, email, password)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING *;
        `;
        const result = await db_user.query(queryInsertUser, [customer_id, first_name, last_name, email, hashedPassword]);
        const newUser = result.rows[0];
  
        return newUser;
      } catch (error) {
        console.error('Errore durante l\'esecuzione della query:', error);
        throw new Error('Errore del server');
      }
    },

    login: async (_, { email, password }) => {
      try {
        // Verifica se l'utente esiste già nel database
        const queryCheckUser = `
          SELECT customer_id, email, password FROM user_app WHERE email = $1;
        `;
        const result = await db_user.query(queryCheckUser, [email]);
        const user = result.rows[0];
        if (!user) {
          throw new Error('Email non valida');
        }
        // Verifica la password
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
          throw new Error('Password non valida');
        }
  
        // Genera un JWT token
        const token = jwt.sign({ customer_id: user.customer_id }, SECRET, { expiresIn: '1h' });
  
        return token;
        
      } catch (error) {
        console.error('Errore durante l\'esecuzione della query:', error);
        throw new Error('Errore del server');
      }
    }
  }

};

module.exports = { typeDefs, resolvers };

