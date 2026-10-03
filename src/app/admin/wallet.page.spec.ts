import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AdminWalletPage } from './wallet.page';

describe('AdminWalletPage', () => {
  let component: AdminWalletPage;
  let fixture: ComponentFixture<AdminWalletPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminWalletPage, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminWalletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});