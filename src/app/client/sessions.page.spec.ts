import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ClientSessionsPage } from './sessions.page';

describe('ClientSessionsPage', () => {
  let component: ClientSessionsPage;
  let fixture: ComponentFixture<ClientSessionsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientSessionsPage, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientSessionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});