import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminStationsPage } from './stations.page';

describe('AdminStationsPage', () => {
  let component: AdminStationsPage;
  let fixture: ComponentFixture<AdminStationsPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(AdminStationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});