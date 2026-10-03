import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { QrScanPage } from './qr-scan.page';

describe('QrScanPage', () => {
  let component: QrScanPage;
  let fixture: ComponentFixture<QrScanPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrScanPage, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(QrScanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});