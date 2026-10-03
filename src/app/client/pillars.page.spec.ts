import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ClientPillarsPage } from './pillars.page';

describe('ClientPillarsPage', () => {
  let component: ClientPillarsPage;
  let fixture: ComponentFixture<ClientPillarsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientPillarsPage, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientPillarsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});