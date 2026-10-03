import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AdminStationsPage } from './stations.page';

describe('AdminStationsPage', () => {
  let component: AdminStationsPage;
  let fixture: ComponentFixture<AdminStationsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminStationsPage, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminStationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});