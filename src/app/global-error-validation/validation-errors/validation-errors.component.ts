import { Component, Input, inject } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { VALIDATION_ERROR_MESSAGES } from './error_messages';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'validation-errors',
  templateUrl: './validation-errors.component.html',
  standalone:true,
  imports:[CommonModule]
})
export class ValidationErrorsComponent {
  @Input() errors: ValidationErrors | null = null;
  errorsMap = inject(VALIDATION_ERROR_MESSAGES) ;
}
