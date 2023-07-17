import { Injectable, Type } from '@angular/core';
import { DdynamicInputComponent } from './ddynamic-input/ddynamic-input.component';
import { DdynamicSelectComponent } from './ddynamic-select/ddynamic-select.component';
import {DynamicControl} from './../dynamic-models'
import { DynamicCheckboxComponent } from './dynamic-checkbox/dynamic-checkbox.component';
import { DynamicGroupComponent } from './dynamic-group/dynamic-group.component';
export type DynamicControlMap=
  {[key in DynamicControl['controlType']]:Type<any>}


@Injectable({
  providedIn: 'root'
})
export class DynamicComponentResolver{

  constructor() { }
  private dynamicControls:DynamicControlMap = {
    'input':DdynamicInputComponent,
    'select':DdynamicSelectComponent,
    'checkbox':DynamicCheckboxComponent,
    'group': DynamicGroupComponent
  }

  resolve(control:keyof DynamicControlMap)
  {
    return this.dynamicControls[control];
  }

}
