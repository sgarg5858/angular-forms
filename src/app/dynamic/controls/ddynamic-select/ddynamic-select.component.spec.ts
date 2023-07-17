import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdynamicSelectComponent } from './ddynamic-select.component';

describe('DdynamicSelectComponent', () => {
  let component: DdynamicSelectComponent;
  let fixture: ComponentFixture<DdynamicSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DdynamicSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DdynamicSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
