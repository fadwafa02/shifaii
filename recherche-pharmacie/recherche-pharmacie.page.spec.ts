import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecherchePharmaciePage } from './recherche-pharmacie.page';

describe('RecherchePharmaciePage', () => {
  let component: RecherchePharmaciePage;
  let fixture: ComponentFixture<RecherchePharmaciePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecherchePharmaciePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
