import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminSessionsPage } from './sessions.page';

describe('AdminSessionsPage', () => {
  let component: AdminSessionsPage;
  let fixture: ComponentFixture<AdminSessionsPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(AdminSessionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});