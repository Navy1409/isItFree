import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeAvailabilityComponent } from './office-availability.component';

describe('OfficeAvailabilityComponent', () => {
  let component: OfficeAvailabilityComponent;
  let fixture: ComponentFixture<OfficeAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficeAvailabilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfficeAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
