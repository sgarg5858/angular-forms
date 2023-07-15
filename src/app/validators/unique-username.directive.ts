import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Directive } from '@angular/core';
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
