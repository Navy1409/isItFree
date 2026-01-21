import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterOrganisation } from './register-organisation';

describe('RegisterOrganisation', () => {
  let component: RegisterOrganisation;
  let fixture: ComponentFixture<RegisterOrganisation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterOrganisation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterOrganisation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
