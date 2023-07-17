import { Injector, Pipe, PipeTransform, inject } from '@angular/core';
import { DynamicControl } from '../dynamic-models';
import { CONTROL_DATA } from './control.token';

@Pipe({
  name: 'controlInjector',standalone:true
})
export class ControlInjectorPipe implements PipeTransform {

  parentInjector= inject(Injector);
  transform(controlKey: string, controlValue:DynamicControl): Injector {
    return Injector.create({
      parent:this.parentInjector,
      providers:[
        {
          provide: CONTROL_DATA,
          useValue:{
            controlKey,controlValue
          }
        }
      ]
    });
  }

}
