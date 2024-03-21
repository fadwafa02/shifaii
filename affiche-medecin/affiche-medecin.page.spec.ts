import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AfficheMedecinPage } from './affiche-medecin.page';

describe('AfficheMedecinPage', () => {
  let component: AfficheMedecinPage;
  let fixture: ComponentFixture<AfficheMedecinPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AfficheMedecinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
