import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AfficheRecettePaysPage } from './affiche-recette-pays.page';

describe('AfficheRecettePaysPage', () => {
  let component: AfficheRecettePaysPage;
  let fixture: ComponentFixture<AfficheRecettePaysPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AfficheRecettePaysPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
