import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormRecord, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserSkillsService } from '../services/user-skills.service';
import { Observable, bufferCount, filter, tap } from 'rxjs';
import { UniqueNameValidator } from '../validators/unique-username.directive';
import { CustomValidators } from '../validators/CustomValidators';
import { ValidationErrorsComponent } from '../global-error-validation/validation-errors/validation-errors.component';
import { DynamicValidatorMessageDirective } from '../global-error-validation/dynamic-validator-message.directive';
import { OnTouchedErrorStateMatcher } from '../global-error-validation/error-state-matcher.service';

@Component({
  selector: 'reactive-form',
  templateUrl: './reactive-form.component.html',
  standalone:true,
  styleUrls: ['./reactive-form.component.scss'],
  imports:[ReactiveFormsModule,CommonModule,ValidationErrorsComponent,DynamicValidatorMessageDirective],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ReactiveFormComponent implements OnInit {

  onTouchedErrorStateMatcher = new OnTouchedErrorStateMatcher();
  userService = inject(UserSkillsService);
  uniqueNameValidator = inject(UniqueNameValidator);
  cd=inject(ChangeDetectorRef);
  skills$!:Observable<string[]>;

  ngOnInit(): void {
    
     this.skills$ = this.userService.userSkills().pipe(
        tap((skills)=>{
        skills.forEach((skill)=>{
          this.userForm.controls.skills.addControl(skill,new FormControl<boolean>(false,{nonNullable:true}))
        })
      }))

      this.userForm.controls.nickName.statusChanges.pipe(
        bufferCount(2,1),
        filter(([prevStatus])=> prevStatus==='PENDING') )
        .subscribe(()=>{this.cd.markForCheck(); })

  }

  userForm = new FormGroup({
    firstName:new FormControl('',[Validators.required,Validators.minLength(3)]),
    lastName:new FormControl('Garg',[Validators.required]),
    email:new FormControl('sgarg5858@gmail.com',[Validators.required,Validators.email]),
    nickName:new FormControl('Sanju',
    {
      validators:[
        Validators.required,Validators.minLength(3),
        CustomValidators.banWords('test')
      ],
      asyncValidators:[this.uniqueNameValidator.validate.bind(this.uniqueNameValidator)]
    }
    ),
    yearOfBirth:new FormControl(1998,[Validators.required,Validators.max(2005)]),
    passport:new FormControl('CTXXTXXXT'),

    address: new FormGroup({
      street:new FormControl('#10 street no 4, Jawahar Nagar',[Validators.required]),
      city:new FormControl('Bathinda',[Validators.required]),
      postCode:new FormControl('151201',Validators.required),
    }),
    password: new FormGroup({
      password:new FormControl('',[Validators.required,Validators.minLength(6)]),
      confirmPassword:new FormControl('')
    },{validators:[CustomValidators.passwordShouldMatch]}),

    skills: new FormRecord<FormControl<boolean>>({})

  })

  onSubmit()
  {
    console.log(this.userForm);
  }


}
