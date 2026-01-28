import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOfficeComponent } from './all-office.component';

describe('AllOfficeComponent', () => {
  let component: AllOfficeComponent;
  let fixture: ComponentFixture<AllOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllOfficeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
