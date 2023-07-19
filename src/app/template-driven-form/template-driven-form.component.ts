import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BanWordsDirective } from '../validators/ban-words.directive';
import { PasswordShouldMatchDirective } from '../validators/password-should-match.directive';
import { UniqueUsernameDirective } from '../validators/unique-username.directive';
import { ValidationErrorsComponent } from '../global-error-validation/validation-errors/validation-errors.component';

@Component({
  selector: 'template-form',
  templateUrl: './template-driven-form.component.html',
  standalone:true,
  styleUrls:['./template-driven-form.component.scss'],
  imports:[FormsModule,CommonModule,
    BanWordsDirective,PasswordShouldMatchDirective,UniqueUsernameDirective,
    ValidationErrorsComponent
  ],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class TemplateDrivenFormComponent implements AfterViewInit {

  banned=['demo'];
  userInfo={
    firstName:"Sanjay",
    lastName:"Garg",
    nickName:"Sanju",
    email:"sgarg5858@gmail.com",
    contact:"9041421558",
    yearOfBirth:1998,
    passport:"",
    street:"Jawahar Nagar,Goniana Mandi",
    city:"Bathinda",
    postCode:151201,
    password:"",
    confirmPassword:""
  }
  isAdult=true;
  @ViewChild(NgForm) ngForm:NgForm|undefined;
  ngAfterViewInit(): void {

     // We need to do this , because ngForm registers controls asynchronously
     // Also deep dive into how angular updates view query!
      queueMicrotask(()=>{
        console.log(this.ngForm,this.ngForm?.controls)
      })
  }

  onSubmit(form:NgForm,event:SubmitEvent)
  {
    console.log(form);
    this.banned=['demo','test','dummy'];
  }

}
