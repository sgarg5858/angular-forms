import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSkillsService {

  constructor(private httpClient:HttpClient){}
   userSkills()
   {
    return of(['Angular','Rxjs','Ngrx','Nx','TypeScript','Scss','css','html5']).pipe(delay(2000))
   }
}
