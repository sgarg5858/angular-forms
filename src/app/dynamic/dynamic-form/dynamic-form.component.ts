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
    tap(()=>{
      this.formGroup = new FormGroup({});
    })
  );



  log()
  {
    console.log(this.formGroup);
    console.log(this.formGroup.value);
  }
  

}
