import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendDialogByCategoryComponent } from './spend-dialog-by-category.component';

describe('SpendDialogByCategoryComponent', () => {
  let component: SpendDialogByCategoryComponent;
  let fixture: ComponentFixture<SpendDialogByCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpendDialogByCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendDialogByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
