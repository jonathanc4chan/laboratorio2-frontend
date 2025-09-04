import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaOrdenesComponent } from './lista-ordenes';

describe('ListaOrdenesComponent', () => {
  let component: ListaOrdenesComponent;
  let fixture: ComponentFixture<ListaOrdenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaOrdenesComponent] // 👈 standalone component
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaOrdenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
