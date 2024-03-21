import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlimentationPage } from './alimentation.page';

describe('AlimentationPage', () => {
  let component: AlimentationPage;
  let fixture: ComponentFixture<AlimentationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AlimentationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
