import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdivinarDiaComponent } from './adivinar-dia.component';

describe('AdivinarDiaComponent', () => {
  let component: AdivinarDiaComponent;
  let fixture: ComponentFixture<AdivinarDiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdivinarDiaComponent]
    });
    fixture = TestBed.createComponent(AdivinarDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
