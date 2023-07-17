import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Subject, switchMap, tap } from 'rxjs';
import { DynamicControl, DynamicFormConfig } from '../dynamic-models';
import { FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/validators/CustomValidators';
import { DynamicComponentResolver } from '../controls/dynamic-component-resolver.service';
import { ControlInjectorPipe } from '../controls/control-injector.pipe';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  standalone:true,
  styleUrls: ['./dynamic-form.component.scss'],
  imports:[CommonModule,ReactiveFormsModule,ControlInjectorPipe]
})
export class DynamicFormComponent {

  dynamicComponentResolver = inject(DynamicComponentResolver);

  formGroup!:FormGroup;
  private httpClient= inject(HttpClient);
  formLoadingTrigger = new Subject<'user'|'company'>();

  public formConfig$ = this.formLoadingTrigger.pipe(
    switchMap((configSource)=> this.httpClient.get<DynamicFormConfig>(`/assets/${configSource}.form.json`)),
    tap((config)=>{

      const controls=config.controls;
      this.formGroup = new FormGroup({});

      Object.keys(controls).forEach((key:string)=>{
        this.buildFormControls(key,controls[key],this.formGroup)
      });
      console.log(this.formGroup);

    })
  );

  buildFormGroup(controlKey:string,control:DynamicControl,parentFormGroup:FormGroup)
  {
    const nestedFormgroup = new FormGroup({});
    const controls =control.controls;
    if(!controls) return;

    Object.keys(controls).forEach((key:string)=>{
      this.buildFormControls(key,controls[key],nestedFormgroup)
    });
    
    parentFormGroup.addControl(controlKey, nestedFormgroup);
  }

  buildFormControls(controlKey:string,control:DynamicControl,parentFormGroup:FormGroup)
  {
    if(control.controlType ==='group')
    {
      this.buildFormGroup(controlKey,control,parentFormGroup)
      return 
    }
      const validators = this.resolveValidators(control.validators)
      parentFormGroup.addControl(controlKey, new FormControl(control.value,validators));
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
      return Validators.nullValidator
    })
  }

  log()
  {
    console.log(this.formGroup);
    console.log(this.formGroup.value);
  }
  

}
