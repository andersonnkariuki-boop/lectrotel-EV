import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ClientWalletPage } from './wallet.page';

describe('ClientWalletPage', () => {
  let component: ClientWalletPage;
  let fixture: ComponentFixture<ClientWalletPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientWalletPage, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientWalletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});