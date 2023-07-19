import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { CommonModule, KeyValue } from '@angular/common';
import { ErrorMessagePipe } from '../error-message.pipe';

@Component({
  selector: 'validation-errors',
  templateUrl: './validation-errors.component.html',
  standalone:true,
  imports:[CommonModule,ErrorMessagePipe]
})
export class ValidationErrorsComponent  {

  @Input() errors: ValidationErrors | null | undefined = null;
 
  trackByFn = (_:number,item:KeyValue<string,any>) =>{
    return item.key;
  }

}
