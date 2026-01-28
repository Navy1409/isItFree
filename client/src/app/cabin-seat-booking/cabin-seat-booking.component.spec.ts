import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinSeatBookingComponent } from './cabin-seat-booking.component';

describe('CabinSeatBookingComponent', () => {
  let component: CabinSeatBookingComponent;
  let fixture: ComponentFixture<CabinSeatBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CabinSeatBookingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CabinSeatBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
