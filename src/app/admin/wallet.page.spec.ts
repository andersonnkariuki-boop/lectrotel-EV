import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminWalletPage } from './wallet.page';

describe('AdminWalletPage', () => {
  let component: AdminWalletPage;
  let fixture: ComponentFixture<AdminWalletPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(AdminWalletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});