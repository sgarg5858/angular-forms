import { Component } from '@angular/core';
import { DynamicBaseComponent } from '../dynamic-base/dynamic-base.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic-checkbox',
  templateUrl: './dynamic-checkbox.component.html',
  imports:[CommonModule,ReactiveFormsModule],
  standalone:true
})
export class DynamicCheckboxComponent extends DynamicBaseComponent {

}
