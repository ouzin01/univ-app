import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationForm } from './formation-form';

describe('FormationForm', () => {
  let component: FormationForm;
  let fixture: ComponentFixture<FormationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormationForm],
    }).compileComponents();

    fixture = TestBed.createComponent(FormationForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
