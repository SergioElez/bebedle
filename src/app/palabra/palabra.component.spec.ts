import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalabraComponent } from './palabra.component';

describe('PalabraComponent', () => {
  let component: PalabraComponent;
  let fixture: ComponentFixture<PalabraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PalabraComponent]
    });
    fixture = TestBed.createComponent(PalabraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
