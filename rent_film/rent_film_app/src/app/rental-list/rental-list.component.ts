import { Component, OnInit } from '@angular/core';
import { ServiceRentService } from '../service/service-rent.service';
import { RentalFilmPayment } from '../Type/interface';
import { Dialog} from '@angular/cdk/dialog';
import { RentDetailsComponent } from '../rent-details/rent-details.component';
import { AuthService } from '../service/auth.service';
import { Sort } from '@angular/material/sort';
import { MatDialogConfig } from '@angular/material/dialog';
import { Location } from '@angular/common';

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.css']
})
export class RentalListComponent implements OnInit{

  displayedColumns: string[] = ['film', 'address', 'payment', 'rental', 'action'];
  rentals: RentalFilmPayment[] = []; // array per memorizzare i noleggi di un dato utente
  columns_title: Array<string> = ['Film', 'Address', 'Payment', 'Data']
  columns_action: Array<string> = ['film', 'address', 'payment', 'rental']
  c_id!: number;
  totalAmount: number = 0;

  constructor(
    private serviceRent: ServiceRentService,
    private location: Location,
    private dialog : Dialog,
    private authService : AuthService // iniettiamo il servizio
  ){}


  ngOnInit(): void {
    this.authService.checkTokenExpiration()
    this.getRent();
  }


  sortData(sort: Sort) {
    const data = this.rentals.slice(); // Crea una copia dell'array rentals

    if (!sort.active || sort.direction === '') {
      // Non eseguire l'ordinamento se non è stata specificata alcuna colonna o direzione di ordinamento
      this.rentals = data;
      return;
    }

    // Ordina l'array in base alla colonna e alla direzione di ordinamento
    this.rentals = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';

      switch (sort.active) {
        case 'film':
          return this.compare(a.film.title, b.film.title, isAsc);
        case 'payment':
          return this.compare(a.payment.amount, b.payment.amount, isAsc);
        case 'rental':
          return this.compare(a.rental.rental_date, b.rental.rental_date, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: any, b: any, isAsc: boolean) {
    // Funzione di confronto per l'ordinamento
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }



  // Ritorna tutti i film
  getRent() : void {
    this.c_id = this.authService.getIdToken()
    console.log(this.c_id)
    this.serviceRent.getRentalsByCustomer(this.c_id).subscribe((response) => {
      this.rentals = response.data.rentalsByCustomer as RentalFilmPayment[];
       // Calcola la somma dei valori rental.payment.amount
       this.totalAmount = Math.floor(this.rentals.reduce((total, rental) => total + rental.payment.amount, 0));
      });
  }

  navigateBack(): void {
    this.serviceRent.isNavigatingBack = true; // Imposta la variabile di stato di navigazione
    this.location.back(); // Torna indietro utilizzando il servizio Location
  }


  // Layer dettagli noleggio
  openDetails(rent: RentalFilmPayment) : void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {film_rent: rent};
    dialogConfig.width = '400px';
    dialogConfig.ariaLabel = 'Rent Datails of film '+rent.film.title,
    this.dialog.open(RentDetailsComponent, dialogConfig);
  }
}
