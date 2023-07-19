import { InjectionToken } from "@angular/core"

export const ERROR_MESSAGES: { [key: string]: string } = {
    required: `This field is required`,
    requiredTrue: `This field is required`,
    email: `It should be a valid email`,
    minlength: `The value length is too short`,
    max: `The value  is too big`,
    banWords: `This word isn't allowed`,
    appBanWords: `This word isn't allowed`,
    appPasswordShouldMatch: `Password should match`,
    passwordShouldMatch: `Password should match`,
    pattern: `Wrong format`,
    appUniqueNickName: `Nickname is taken`,
    uniqueName: `Nickname is taken`,
  }

  export const VALIDATION_ERROR_MESSAGES = new InjectionToken('Validation Error Messages',{
    providedIn:'root',
    factory:()=> ERROR_MESSAGES
  })