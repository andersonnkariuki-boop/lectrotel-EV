import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminClientsPage } from './clients.page';

describe('AdminClientsPage', () => {
  let component: AdminClientsPage;
  let fixture: ComponentFixture<AdminClientsPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(AdminClientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});