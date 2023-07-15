import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'reactive-form',
  templateUrl: './reactive-form.component.html',
  standalone:true,
  styleUrls: ['./reactive-form.component.scss'],
  imports:[ReactiveFormsModule,CommonModule],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ReactiveFormComponent {

  userForm = new FormGroup({
    firstName:new FormControl('Sanjay',[Validators.required,Validators.minLength(3)]),
    lastName:new FormControl('Garg',[Validators.required]),
    email:new FormControl('sgarg5858@gmail.com',[Validators.required,Validators.email]),
    nickName:new FormControl('Sanju',
    {
      validators:[Validators.required,Validators.minLength(3)],
      asyncValidators:[]
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
    },{validators:[]}),
    
  })

  onSubmit()
  {
    console.log(this.userForm);
  }


}
