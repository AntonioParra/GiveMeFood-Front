import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantFilterPopupComponent } from './restaurant-filter-popup.component';

describe('RestaurantFilterPopupComponent', () => {
  let component: RestaurantFilterPopupComponent;
  let fixture: ComponentFixture<RestaurantFilterPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurantFilterPopupComponent]
    });
    fixture = TestBed.createComponent(RestaurantFilterPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
