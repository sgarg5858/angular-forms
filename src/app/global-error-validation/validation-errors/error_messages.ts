import { InjectionToken } from "@angular/core"

export const ERROR_MESSAGES: { [key: string]: (errors:any)=> string } = {
    required: () => `This field is required`,
    requiredTrue: ()=> `This field is required`,
    email: ()=> `It should be a valid email`,
    minlength:(errors)=>{
      console.log(errors);
      return `The length should be atleast ${errors.requiredLength} characters`
    },
    max:(errors) => {
      console.log(errors);
      return `The length should be atleast characters`
    },
    banWords:()=> `This word isn't allowed`,
    appBanWords:()=> `This word isn't allowed`,
    appPasswordShouldMatch: ()=> `Password should match`,
    passwordShouldMatch: ()=> `Password should match`,
    pattern: ()=> `Wrong format`,
    appUniqueNickName: ()=> `Nickname is taken`,
    uniqueName: ()=> `Nickname is taken`,
  }

  export const VALIDATION_ERROR_MESSAGES = new InjectionToken('Validation Error Messages',{
    providedIn:'root',
    factory:()=> ERROR_MESSAGES
  })