import { Injectable, Type } from '@angular/core';
import {DynamicControl} from './../dynamic-models'
import { from, of, tap } from 'rxjs';
type DynamicControlMap = {[T in DynamicControl['controlType']]: () => Promise<Type<any>>};


@Injectable({
  providedIn: 'root'
})
export class DynamicComponentResolver{

  constructor() { }
  private lazyControlComponents:DynamicControlMap = {
    'input': () => import('./ddynamic-input/ddynamic-input.component').then(c=>c.DdynamicInputComponent),
    'select': () => import('./ddynamic-select/ddynamic-select.component').then(c=>c. DdynamicSelectComponent),
    'checkbox': () => import('./dynamic-checkbox/dynamic-checkbox.component').then(c=>c. DynamicCheckboxComponent),
    'group': () => import('./dynamic-group/dynamic-group.component').then(c=>c.DynamicGroupComponent)
  }

  private loadedControls = new Map<string,Type<any>>();

  resolve(controlType:keyof DynamicControlMap)
  {
    const loadedComponent = this.loadedControls.get(controlType);
    if(loadedComponent) return of(loadedComponent);
    return from(
      this.lazyControlComponents[controlType]()
    ).pipe(
      tap((component)=>this.loadedControls.set(controlType,component))
    )
  }
}
