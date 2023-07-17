import { Component } from '@angular/core';
import { DynamicBaseComponent } from '../dynamic-base/dynamic-base.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ddynamic-select',
  templateUrl: './ddynamic-select.component.html',
  standalone:true,
  imports:[CommonModule,ReactiveFormsModule]
})
export class DdynamicSelectComponent extends DynamicBaseComponent {

}
