import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientPillarsPage } from './pillars.page';

describe('ClientPillarsPage', () => {
  let component: ClientPillarsPage;
  let fixture: ComponentFixture<ClientPillarsPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(ClientPillarsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});