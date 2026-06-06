import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Courriers } from './courriers';

describe('Courriers', () => {
  let component: Courriers;
  let fixture: ComponentFixture<Courriers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Courriers],
    }).compileComponents();

    fixture = TestBed.createComponent(Courriers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
