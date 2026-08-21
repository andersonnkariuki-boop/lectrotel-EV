import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientSessionsPage } from './sessions.page';

describe('ClientSessionsPage', () => {
  let component: ClientSessionsPage;
  let fixture: ComponentFixture<ClientSessionsPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(ClientSessionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});