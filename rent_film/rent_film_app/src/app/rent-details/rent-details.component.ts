import { Component, OnInit, Inject  } from '@angular/core';
import { Router } from '@angular/router';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { RentalFilmPayment } from '../Type/interface';

@Component({
  selector: 'app-rent-details',
  templateUrl: './rent-details.component.html',
  styleUrls: ['./rent-details.component.css']
})
export class RentDetailsComponent {

  rent:  RentalFilmPayment;
  storeSelected : boolean = false;

  constructor(
    private _router: Router,
    @Inject(DIALOG_DATA) public data: {film_rent: RentalFilmPayment},
    public dialogRef: DialogRef<any>
  ) {
    this.rent= data.film_rent
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  click(selected: boolean) : void {
    this.storeSelected = selected
  }

  rent_page(rent : RentalFilmPayment) : void{
    this._router.navigate(['rent', JSON.stringify(rent)])
    this.closeDialog()

  }



}
