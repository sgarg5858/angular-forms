import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdynamicInputComponent } from './ddynamic-input.component';

describe('DdynamicInputComponent', () => {
  let component: DdynamicInputComponent;
  let fixture: ComponentFixture<DdynamicInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DdynamicInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DdynamicInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
