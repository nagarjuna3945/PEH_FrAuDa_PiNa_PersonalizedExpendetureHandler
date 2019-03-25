import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendTableComponent } from './spend-table.component';

describe('SpendTableComponent', () => {
  let component: SpendTableComponent;
  let fixture: ComponentFixture<SpendTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpendTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
