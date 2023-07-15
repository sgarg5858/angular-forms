import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[passwordShouldMatch]',
  standalone:true,
  providers:[
    {
      provide:NG_VALIDATORS,
      useExisting:PasswordShouldMatchDirective,
      multi:true
    }
  ]
})
export class PasswordShouldMatchDirective implements Validator {

  validate(control: AbstractControl<unknown>): ValidationErrors | null {

    console.log(control);
    if(control instanceof FormGroup)
    {
      const passwordControl = control.get('password');
      const confirmPasswordControl = control.get('confirmPassword');
      if(passwordControl && confirmPasswordControl && passwordControl.value !== confirmPasswordControl.value)
      {
        confirmPasswordControl.setErrors({passwordShouldMatch:true})
        return {passwordShouldMatch:true};
      }
      return  null;

    }
    return null;
  }
}
