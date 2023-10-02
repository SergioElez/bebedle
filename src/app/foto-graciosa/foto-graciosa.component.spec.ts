import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoGraciosaComponent } from './foto-graciosa.component';

describe('FotoGraciosaComponent', () => {
  let component: FotoGraciosaComponent;
  let fixture: ComponentFixture<FotoGraciosaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FotoGraciosaComponent]
    });
    fixture = TestBed.createComponent(FotoGraciosaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
