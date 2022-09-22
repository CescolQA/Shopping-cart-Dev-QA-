import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemcartComponent } from './itemcart.component';

describe('ItemcartComponent', () => {
  let component: ItemcartComponent;
  let fixture: ComponentFixture<ItemcartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemcartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
