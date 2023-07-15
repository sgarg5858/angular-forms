import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BanWordsDirective } from '../validators/ban-words.directive';
import { PasswordShouldMatchDirective } from '../validators/password-should-match.directive';

@Component({
  selector: 'template-form',
  templateUrl: './template-driven-form.component.html',
  standalone:true,
  styleUrls:['./template-driven-form.component.scss'],
  imports:[FormsModule,CommonModule,BanWordsDirective,PasswordShouldMatchDirective],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class TemplateDrivenFormComponent implements OnInit {

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

  onSubmit(form:NgForm,event:SubmitEvent)
  {
    console.log(form);
    this.banned=['demo','test','dummy'];
  }

  ngOnInit(): void {
     
  }

}
