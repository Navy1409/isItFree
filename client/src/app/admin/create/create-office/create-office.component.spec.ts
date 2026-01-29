import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOfficeComponent } from './create-office.component';

describe('CreateOfficeComponent', () => {
  let component: CreateOfficeComponent;
  let fixture: ComponentFixture<CreateOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOfficeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
