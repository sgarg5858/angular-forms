import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Directive, Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, catchError, finalize, map, of } from 'rxjs';

@Directive({
  selector: '[uniqueName]',standalone:true,
  providers:[
    {
      provide:NG_ASYNC_VALIDATORS,
      multi:true,
      useExisting:UniqueUsernameDirective
    }
  ]
})
export class UniqueUsernameDirective implements AsyncValidator{

  constructor(
    private httpClient:HttpClient,
    private changeDetector:ChangeDetectorRef
    ) { }

  validate(control: AbstractControl<string>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
   
   return this.httpClient.get<any[]>(`https://jsonplaceholder.typicode.com/users?username=${control?.value}`).pipe(
      map((users)=> users.length === 0 ? null :  { appUniqueNickname:{nameAlreadyTaken:true} } 
      ),
      catchError((err)=>{
        return of({appUniqueNickname:{unknownError:err}})
      }),
      finalize(()=>{
        this.changeDetector.markForCheck();
      })
    )

  }
}


@Injectable({
  providedIn: 'root'
})
export class UniqueNameValidator implements AsyncValidator {

  constructor(private httpClient:HttpClient) { }
  validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

     return this.httpClient.get<unknown[]>(`https://jsonplaceholder.typicode.com/users?username=${control.value}`).pipe(
     map((users)=>{
        return users.length ===0 ? null : {
          appUniqueNickName:{  isAlreadyTaken:true }
        }
      }),
      catchError(()=> of({appUniqueNickName:{  isAlreadyTaken:true }})),
    )
  }
}