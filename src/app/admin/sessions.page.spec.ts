import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AdminSessionsPage } from './sessions.page';

describe('AdminSessionsPage', () => {
  let component: AdminSessionsPage;
  let fixture: ComponentFixture<AdminSessionsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSessionsPage, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSessionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});