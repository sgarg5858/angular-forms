import { Type } from "@angular/core";
import { Validators } from "@angular/forms";
import { of } from "rxjs";
import { CustomValidators } from "../validators/CustomValidators";

export interface DynamicOption<T>{
    label:string;
    value:T
}
export type ValidatorKeys =keyof Omit<typeof Validators , 'composeAsync'|'compose'|'prototype'>;
export type CombinedValidators = ValidatorKeys | keyof Omit< typeof CustomValidators , 'prototype'>

export interface DynamicControl<T=string>{
    controlType:"input"|"select"|"checkbox";
    type?:'text'|'email'|'number';
    label:string;
    value: T |null;
    options?: DynamicOption<T>[];
    validators?: {[key in CombinedValidators]:unknown}
}

export interface DynamicFormConfig{
    description:string;
    controls:{[key:string]:DynamicControl};
}