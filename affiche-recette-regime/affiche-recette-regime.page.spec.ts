import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AfficheRecetteRegimePage } from './affiche-recette-regime.page';

describe('AfficheRecetteRegimePage', () => {
  let component: AfficheRecetteRegimePage;
  let fixture: ComponentFixture<AfficheRecetteRegimePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AfficheRecetteRegimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
