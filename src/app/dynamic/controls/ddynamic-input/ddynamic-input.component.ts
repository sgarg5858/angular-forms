import { Component } from '@angular/core';
import { DynamicBaseComponent } from '../dynamic-base/dynamic-base.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ddynamic-input',
  templateUrl: './ddynamic-input.component.html',
  standalone:true,
  imports:[CommonModule,ReactiveFormsModule]
})
export class DdynamicInputComponent extends DynamicBaseComponent {

}
