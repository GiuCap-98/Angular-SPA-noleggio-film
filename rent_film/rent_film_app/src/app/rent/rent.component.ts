import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import { DialogComponentComponent } from '../dialog-component/dialog-component.component';
import { FilmCategoryStore, FilmDetails, StoreOccorrency } from '../Type/interface';
import { ServiceRentService } from '../service/service-rent.service';
import { MatDialogConfig } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit{

  public errors: string[]= [];
  form!: FormGroup;

  film!: FilmDetails;
  stores!: StoreOccorrency[];
  dataSelected: boolean = false;
  storeSelected : boolean = false;
  selectedValueStore: string = "";
  selectedValueData: string = "";
  hasErrors: boolean = false;

  constructor( private fb: FormBuilder, private authService: AuthService, private route: ActivatedRoute, private dialog: Dialog, private serviceRent: ServiceRentService, private location: Location) {
      this.form = this.fb.group({
        data: ['', Validators.required],
        store: ['', Validators.required]
    });
  }

  ngOnInit() : void {
    this.authService.checkTokenExpiration()
    this.route.params.subscribe(params => {
      this.film = JSON.parse(params['film']);
      this.stores = JSON.parse(params['stores']);

    });
  }


  rent() : void {
    this.openDialog()
  }


  click_data(selected: boolean) : void {
    this.dataSelected = selected
  }
  click_store(selected: boolean) : void {
    this.storeSelected = selected
  }

  navigateBack(): void {
    this.serviceRent.isNavigatingBack = true; // Imposta la variabile di stato di navigazione
    this.location.back(); // Torna indietro utilizzando il servizio Location
  }

  // Layer di avvenuto noleggio
  openDialog() : void {
    this.errors=[]
    if(this.selectedValueStore && this.selectedValueData){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {text:'Rent success!' };
      dialogConfig.ariaLabel =  'Rent success dialog',
      this.dialog.open(DialogComponentComponent, dialogConfig);

    }else{
      if (!this.selectedValueStore ) {
        this.errors.push('The field store is required')
        console.log(this.errors)
      }
      // Verifica se il data store è vuoto
      if (!this.selectedValueData) {
        this.errors.push('The field data is required');
      }

      this.hasErrors = this.errors.length > 0;
    }
  }
}
