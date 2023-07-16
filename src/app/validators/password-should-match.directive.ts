import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { CustomValidators } from './CustomValidators';

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

    return CustomValidators.passwordShouldMatch(control);
    
  }
}
