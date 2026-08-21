import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientStationsPage } from './stations.page';

describe('ClientStationsPage', () => {
  let component: ClientStationsPage;
  let fixture: ComponentFixture<ClientStationsPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(ClientStationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});