import { ComponentRef, Directive, OnDestroy, OnInit, ViewContainerRef, inject } from '@angular/core';
import { NgControl, NgModel } from '@angular/forms';
import { Subscription, skip, startWith } from 'rxjs';
import { ValidationErrorsComponent } from './validation-errors/validation-errors.component';

@Directive({
  selector: '[ngModel],[formControlName],[formControl]',
  standalone:true
})
export class DynamicValidatorMessageDirective implements OnInit,OnDestroy {

  ngControl = inject(NgControl,{self:true});

  private viewContainerRef= inject(ViewContainerRef);
  private componentRef:ComponentRef<ValidationErrorsComponent>|null=null;
  private statusChangesSubscription:Subscription|undefined;

  ngOnInit(): void {

    if(!this.ngControl.control)
      {
        throw new Error(`No control model for ${this.ngControl.name}`);
      }

    this.statusChangesSubscription =  this.ngControl.control?.statusChanges.pipe(
      startWith(this.ngControl.status),
      skip(this.ngControl instanceof NgModel ? 1 : 0)
    )
    .subscribe(()=>{
        if(this.ngControl.errors)
        {
          if(!this.componentRef)
          {
            this.componentRef=this.viewContainerRef.createComponent(ValidationErrorsComponent);
          }
          //Putting it outside as , it might happen, that just error changes
          this.componentRef.instance.errors=this.ngControl.errors;
        }else
        {
          this.componentRef?.destroy();
          this.componentRef=null;
        }
      })
  }

  ngOnDestroy(): void {

      this.statusChangesSubscription?.unsubscribe();

      this.componentRef?.destroy();
      this.componentRef=null;
  }

}
