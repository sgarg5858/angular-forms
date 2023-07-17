import { InjectionToken } from "@angular/core";
import { DynamicControl } from "../dynamic-models";
export interface ControlData{
    controlKey:string;
    controlValue:DynamicControl
}
export const CONTROL_DATA = new InjectionToken<ControlData>('ControlData');