import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProductosComponent } from './form-productos.component';

describe('FormProductosComponent', () => {
  let component: FormProductosComponent;
  let fixture: ComponentFixture<FormProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormProductosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
