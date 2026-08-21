import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPillarsPage } from './pillars.page';

describe('AdminPillarsPage', () => {
  let component: AdminPillarsPage;
  let fixture: ComponentFixture<AdminPillarsPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(AdminPillarsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});