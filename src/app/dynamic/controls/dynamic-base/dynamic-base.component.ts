import { Component, Inject, InjectFlags, OnInit, Provider, inject } from '@angular/core';
import { CONTROL_DATA } from '../control.token';
import { AbstractControl, ControlContainer, FormControl, FormGroup, ValidatorFn, Validators, } from '@angular/forms';
import { DynamicControl } from '../../dynamic-models';
import { CustomValidators } from 'src/app/validators/CustomValidators';

//This comes from the fact 
//in formControlName directive codebase the parent formgroup is just asked as a dependency injection
// and viewProviders are considered under @Host
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
export class DynamicBaseComponent  implements OnInit{

  control = inject(CONTROL_DATA);

  formControl:AbstractControl = new FormControl(this.control.controlValue.value,this.resolveValidators(this.control.controlValue.validators));

  parentFormGroup = inject(ControlContainer,{skipSelf:true});

  ngOnInit(): void {
     (this.parentFormGroup.control as FormGroup).addControl(this.control.controlKey,this.formControl)
  }
 

  resolveValidators(validators:DynamicControl['validators']):ValidatorFn[]
  {
    if(!validators) return [];
    return (Object.keys(validators) as Array<keyof typeof validators> ).map((key)=>{
      const value = validators[key]; 
      if(key ==='required')
      {
        return Validators.required
      }
      if(key ==='requiredTrue')
      {
        return Validators.requiredTrue
      }
      if(key ==='email')
      {
        return Validators.email
      }
      if(key ==='banWords' && (typeof value === 'string' || Array.isArray(value) ))
      {
        return CustomValidators.banWords(value)
      }
      if(key ==='minLength' && typeof value ==='number')
      {
        return Validators.minLength(value)
      }
      if(key ==='passwordShouldMatch' )
      {
        return CustomValidators.passwordShouldMatch
      }
      return Validators.nullValidator
    })
  }
}
