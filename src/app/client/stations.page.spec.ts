import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ClientStationsPage } from './stations.page';

describe('ClientStationsPage', () => {
  let component: ClientStationsPage;
  let fixture: ComponentFixture<ClientStationsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientStationsPage, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientStationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});