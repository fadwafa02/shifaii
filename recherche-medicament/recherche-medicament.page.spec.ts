import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RechercheMedicamentPage } from './recherche-medicament.page';

describe('RechercheMedicamentPage', () => {
  let component: RechercheMedicamentPage;
  let fixture: ComponentFixture<RechercheMedicamentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RechercheMedicamentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
