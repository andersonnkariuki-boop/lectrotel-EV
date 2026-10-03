import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AdminClientsPage } from './clients.page';

describe('AdminClientsPage', () => {
  let component: AdminClientsPage;
  let fixture: ComponentFixture<AdminClientsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminClientsPage, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminClientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});