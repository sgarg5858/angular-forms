import { ChangeDetectorRef, ComponentRef, Directive, Input, OnDestroy, OnInit, ViewContainerRef, inject } from '@angular/core';
import { ControlContainer, FormGroupDirective, NgControl, NgForm, NgModel } from '@angular/forms';
import { Subscription, skip, startWith } from 'rxjs';
import { ValidationErrorsComponent } from './validation-errors/validation-errors.component';
import { ErrorStateMatcher } from './error-state-matcher.service';

@Directive({
  selector: `
    [ngModel]:not([withoutValidationErrors]),
    [formControlName]:not([withoutValidationErrors]),
    [formControl]:not([withoutValidationErrors]),
    [formGroupName]:not([withoutValidationErrors]),
    [ngModelGroup]:not([withoutValidationErrors])
  `,
  standalone:true
})
export class DynamicValidatorMessageDirective implements OnInit,OnDestroy {

  ngControl = inject(NgControl,{self:true,optional:true}) || inject(ControlContainer,{self:true,optional:true});

  @Input() errorStateMatcher = inject(ErrorStateMatcher);
  @Input() container= inject(ViewContainerRef);

  private parentContainer= inject(ControlContainer,{optional:true});
  private cd = inject(ChangeDetectorRef);

  get form()
  {
    return this.parentContainer?.formDirective as NgForm | FormGroupDirective;
  }

  private componentRef:ComponentRef<ValidationErrorsComponent>|null=null;
  private statusChangesSubscription:Subscription|undefined;

  ngOnInit(): void {

    //Required For Template Driven Forms
   queueMicrotask(()=>{

    if(!this.ngControl?.control)
    {
      throw new Error(`No control model for ${this.ngControl?.name}`);
    }

    this.statusChangesSubscription =  this.ngControl.control?.statusChanges.pipe(
      startWith(this.ngControl.status),
      skip(this.ngControl instanceof NgModel ? 1 : 0)
    )
    .subscribe(()=>{
        if(this.errorStateMatcher.isErrorVisible(this.ngControl?.control,this.form))
        {
          if(!this.componentRef)
          {
            this.componentRef=this.container.createComponent(ValidationErrorsComponent);
          }
          //Putting it outside as , it might happen, that just error changes
          this.componentRef.instance.errors=this.ngControl?.errors;
          this.cd.markForCheck();

        }else
        {
          this.componentRef?.destroy();
          this.componentRef=null;
        }
      })

   })
  }

  ngOnDestroy(): void {

      this.statusChangesSubscription?.unsubscribe();

      this.componentRef?.destroy();
      this.componentRef=null;
  }

}
