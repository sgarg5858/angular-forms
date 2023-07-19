import { Directive, ViewContainerRef, inject } from '@angular/core';

@Directive({
  selector: '[validatorMessageContainer]',
  standalone:true,
  exportAs:'validatorMessageContainer'
})
export class DynamicValidatorMessageContainer {
 public container = inject(ViewContainerRef);
}
