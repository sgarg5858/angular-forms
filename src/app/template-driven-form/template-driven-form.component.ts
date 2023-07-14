import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'template-form',
  templateUrl: './template-driven-form.component.html',
  standalone:true,
  styleUrls:['./template-driven-form.component.scss'],
  imports:[FormsModule,CommonModule]
})
export class TemplateDrivenFormComponent {

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
    console.log(form.value);
  }

}
