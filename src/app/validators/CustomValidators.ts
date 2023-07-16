import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

export class CustomValidators{
    
    static passwordShouldMatch(control:AbstractControl):ValidationErrors|null
    {
        if(control instanceof FormGroup)
        {
            const passwordControl = control.get('password');
            const confirmPasswordControl = control.get('confirmPassword');
            if(passwordControl && confirmPasswordControl && passwordControl.value !== confirmPasswordControl.value)
            {
            confirmPasswordControl.setErrors({passwordShouldMatch:true})
            return {passwordShouldMatch:true};
            }
            return  null;

        }
        return null;
    }

    static banWords(banWords:string|string[]){
  
        const bannedWords = Array.isArray(banWords) ? banWords :[banWords];
      
        return  (control: AbstractControl<string>): ValidationErrors | null => {
          const value = control.value;
          console.log(value,bannedWords);
          const bannedWord = bannedWords.find((word)=> word?.toLowerCase() === value?.toLowerCase());
          console.log(bannedWord);
          if(bannedWord)
          {
            return { banWords: bannedWord }
          }
          return null;
        }
    }
    
}