import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Insertion } from './insertion';

describe('Insertion', () => {
  let component: Insertion;
  let fixture: ComponentFixture<Insertion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Insertion],
    }).compileComponents();

    fixture = TestBed.createComponent(Insertion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
