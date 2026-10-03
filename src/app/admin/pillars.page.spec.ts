import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AdminPillarsPage } from './pillars.page';

describe('AdminPillarsPage', () => {
  let component: AdminPillarsPage;
  let fixture: ComponentFixture<AdminPillarsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPillarsPage, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPillarsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});