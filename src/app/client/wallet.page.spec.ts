import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientWalletPage } from './wallet.page';

describe('ClientWalletPage', () => {
  let component: ClientWalletPage;
  let fixture: ComponentFixture<ClientWalletPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(ClientWalletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});