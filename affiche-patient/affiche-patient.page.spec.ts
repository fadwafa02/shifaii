import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AffichePatientPage } from './affiche-patient.page';

describe('AffichePatientPage', () => {
  let component: AffichePatientPage;
  let fixture: ComponentFixture<AffichePatientPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AffichePatientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
