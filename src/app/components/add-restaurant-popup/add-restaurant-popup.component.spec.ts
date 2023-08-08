import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRestaurantPopupComponent } from './add-restaurant-popup.component';

describe('AddRestaurantPopupComponent', () => {
  let component: AddRestaurantPopupComponent;
  let fixture: ComponentFixture<AddRestaurantPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRestaurantPopupComponent]
    });
    fixture = TestBed.createComponent(AddRestaurantPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
