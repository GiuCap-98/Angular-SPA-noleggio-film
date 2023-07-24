import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceRentService } from '../service/service-rent.service';
import { DialogRef, DIALOG_DATA} from '@angular/cdk/dialog';
import { FilmDetails, StoreOccorrency, Actor } from '../Type/interface';



@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css'],
})
export class FilmDetailsComponent implements OnInit {

  film:  FilmDetails;
  stores!: StoreOccorrency[];
  actors!: Actor[]
  storeAv: boolean = false;

  constructor(
    private _router: Router,
    private serviceRent: ServiceRentService,
    @Inject(DIALOG_DATA) public data: {film_and_category: FilmDetails, stores: StoreOccorrency[]},
    public dialogRef: DialogRef<FilmDetailsComponent>
  ) {
    this.film= data.film_and_category
    this.stores= data.stores
  }

  ngOnInit(): void {
    this.getActors(this.film.film.film_id)
  }

  getActors(film_id:number): void {
    this.serviceRent.getActors(film_id).subscribe((response) => {
      this.actors = response.data.searchActorsByFilm as Actor[];
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  rent_page(film : FilmDetails, stores: StoreOccorrency[]) : void{
    this.closeDialog()
    this._router.navigate(['rent', JSON.stringify(film), JSON.stringify(stores)])
  }

  storeAvailable(stores: StoreOccorrency[]): boolean{
    if(stores[0].num_film == 0 && stores[1].num_film == 0){
      return this.storeAv=false
    }
    return this.storeAv=true

  }

}