import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
    private authTokenKey = 'auth_token'; // Chiave per accedere al token nello storage

    constructor(private apollo: Apollo) {}

    getLogged(email: string, password:string): Observable<any>{
      const Logged_User = gql`
        query findUser($email: String!, $password: String!) {
          findUser(email: $email, password: $password) {
            customer_id
            first_name
            last_name
            email
          }
        }
      `
      return this.apollo.query({
        query: Logged_User ,
        variables: {
          email : email,
          password : password
        }
      });

    }

    getLoggedHash(email: string, password:string): Observable<any>{
      const Logged_User = gql`
        query findUserHash($email: String!, $password: String!) {
          findUserHash(email: $email, password: $password) {
            customer_id
            first_name
            last_name
            email
          }
        }
      `
      return this.apollo.query({
        query: Logged_User ,
        variables: {
          email : email,
          password : password
        }
      });

    }

    registerUser(user: any): Observable<any> {
      const registerUser = gql`
        mutation registerUser($input: any) {
          registerUser(input: $input) {
            customer_id
            first_name
            last_name
            email
            password
          }
        }
      `;

      return this.apollo.mutate({
        mutation: registerUser,
        variables: {
          input: user
        }
      });
    }


    returnNameCustomer(email: string): Observable<any> {
      const returnNameCustomer = gql`
        query returnNameCustomer($email: String!) {
          returnNameCustomer(email: $email) {
            customer_id
            first_name
            last_name

          }
        }
      `;

      return this.apollo.query({
        query: returnNameCustomer,
        variables: {
          email: email
        }
      });
    }




    setAuthToken(token: string): void {
        localStorage.setItem(this.authTokenKey, token);
    }

    getAuthToken(): string | null {
        return localStorage.getItem(this.authTokenKey);
    }

    clearAuthToken(): void {
        localStorage.removeItem(this.authTokenKey);
    }

    isUserAuthenticated(): boolean {
        const token = this.getAuthToken();
        return !!token; // Verifica se il token esiste
    }
}
