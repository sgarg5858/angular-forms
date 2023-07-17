import { Component, Inject, InjectFlags, Provider, inject } from '@angular/core';
import { CONTROL_DATA } from '../control.token';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';

// export const controlContainerProvider:Provider={
//   provide:ControlContainer,
//   useFactory : () =>{
//     const formGroup = inject(ControlContainer,ski)
//   }
// }

@Component({
  selector: 'app-dynamic-base',
  template:"",
  standalone:true
})
export class DynamicBaseComponent {

  formGroup = inject(FormGroupDirective,{skipSelf:true});
  get form()
  {
    return this.formGroup.control as FormGroup;
  }
  control = inject(CONTROL_DATA);

}
