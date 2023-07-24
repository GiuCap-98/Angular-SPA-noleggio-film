import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentDetailsComponent } from './rent-details.component';

describe('RentDetailsComponent', () => {
  let component: RentDetailsComponent;
  let fixture: ComponentFixture<RentDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentDetailsComponent]
    });
    fixture = TestBed.createComponent(RentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
