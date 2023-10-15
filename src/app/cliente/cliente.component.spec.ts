import { ComponentFixture, TestBed } from '@angular/core/testing';

import ClienteComponent from './cliente.component';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

describe('ClienteComponent', () => {
  let component: ClienteComponent;
  let fixture: ComponentFixture<ClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteComponent]
    });
    fixture = TestBed.createComponent(ClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
