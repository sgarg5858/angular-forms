import { Component, inject } from '@angular/core';
import { DynamicComponentResolver } from '../dynamic-component-resolver.service';
import { CommonModule } from '@angular/common';
import { ControlInjectorPipe } from '../control-injector.pipe';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicBaseComponent, controlContainerProvider } from '../dynamic-base/dynamic-base.component';

@Component({
  selector: 'app-dynamic-group',
  templateUrl: './dynamic-group.component.html',
  standalone:true,
  imports:[CommonModule,ControlInjectorPipe,ReactiveFormsModule],
  viewProviders:[controlContainerProvider]
})
export class DynamicGroupComponent extends DynamicBaseComponent {

  dynamicComponentResolver = inject(DynamicComponentResolver);
  override formControl = new FormGroup({},{validators:this.resolveValidators(this.control.controlValue.validators)});

}
