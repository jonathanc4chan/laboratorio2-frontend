import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevaOrdenComponent } from './nueva-orden';

describe('NuevaOrdenComponent', () => {
  let component: NuevaOrdenComponent;
  let fixture: ComponentFixture<NuevaOrdenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaOrdenComponent] // 👈 porque es standalone
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevaOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

