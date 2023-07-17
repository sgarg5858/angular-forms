import { Component, Inject, InjectFlags, Provider, inject } from '@angular/core';
import { CONTROL_DATA } from '../control.token';
import { ControlContainer, } from '@angular/forms';

//THis comes from the fact 
//in formControlName directive codebase the parent formgroup is just asked as a dependency injection
// and viewProviders are considered under @Host Resolution
export const controlContainerProvider:Provider={
  provide:ControlContainer,
  useFactory : () =>{
    const formGroup = inject(ControlContainer,{skipSelf:true});
    return formGroup;
  }
}

@Component({
  selector: 'app-dynamic-base',
  template:"",
  standalone:true
})
export class DynamicBaseComponent {

  
  control = inject(CONTROL_DATA);

}
