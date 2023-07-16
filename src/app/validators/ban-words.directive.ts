import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[banWords]',
  standalone:true,
  providers:[
    {
      provide:NG_VALIDATORS,
      useExisting:BanWordsDirective,
      multi:true
    }
  ],
  
})
export class BanWordsDirective implements Validator {

  protected bannedWords:string[]=[];
  @Input() set banWords(words:string|string[])
  {
    if(Array.isArray(words))
    {
      this.bannedWords=words;
    }
    else
    {
      this.bannedWords=[words];
    }
    //Suppose wrong value is entered
    //and after that inputs changed
    //our validator will not run, it only runs, if value changes,
    //but if user just submits the form, then we could end up storing invalid value
    //this function will run as soon as input changes, which causes validator to run!
    this.inputChanged();
  }
  inputChanged = () =>{};
  constructor() { }
  validate(control: AbstractControl<string>): ValidationErrors | null {
    const value = control.value;
    console.log(value,this.bannedWords);
    const bannedWord = this.bannedWords.find((word)=> word?.toLowerCase() === value?.toLowerCase());
    console.log(bannedWord);
    if(bannedWord)
    {
      return { banWords: bannedWord }
    }
    return null;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.inputChanged = fn;
  }

}


export const banWords = (banWords:string|string[]) =>{
  
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