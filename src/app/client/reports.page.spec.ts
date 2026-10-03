import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ClientReportsPage } from './reports.page';

describe('ClientReportsPage', () => {
  let component: ClientReportsPage;
  let fixture: ComponentFixture<ClientReportsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientReportsPage, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientReportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});