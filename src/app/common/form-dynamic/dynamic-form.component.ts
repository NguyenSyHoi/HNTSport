import { Util } from './../../utils/functions';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzFormLayoutType } from 'ng-zorro-antd/form';
import { TYPE_PROPERTY } from '../constant/type-property';
import { FormModule } from './form-module';
import { Control, DataForm } from '../types/form-type';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  standalone: true,
  imports: [FormModule]
})
export class DynamicFormComponent implements OnInit {
  @Input() dataForm!: DataForm;
  formGroup: FormGroup = new FormGroup({});
  TYPE_INPUT = TYPE_PROPERTY;
  @Input() layoutForm: NzFormLayoutType = 'vertical';
  @Input() col_grid = 4;
  constructor(private fb: FormBuilder) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes['dataForm'].firstChange) {
      this.createForm(this.dataForm.controls);
      console.log(this.formGroup);

    }
  }
  ngOnInit() {
  }
  createForm(data: Control[]) {
    for (const control of data) {
      const validatorsToAdd: any = [];
      this.addValidator(control, validatorsToAdd);
      this.formGroup.addControl(
        control.name,
        this.fb.nonNullable.control(control.value, validatorsToAdd)
      )
    }
  }
  addValidator(control: Control, validatorsToAdd: any[]) {
    for (const [key, value] of Object.entries(control.validators)) {
      switch (key) {
        case 'min':
          validatorsToAdd.push(Validators.min(value));
          break;
        case 'max':
          validatorsToAdd.push(Validators.max(value));
          break;
        case 'required':
          if (value) {
            validatorsToAdd.push(Validators.required);
          }
          break;
        case 'requiredTrue':
          if (value) {
            validatorsToAdd.push(Validators.requiredTrue);
          }
          break;
        case 'email':
          if (value) {
            validatorsToAdd.push(Validators.email);
          }
          break;
        case 'minLength':
          validatorsToAdd.push(Validators.minLength(value));
          break;
        case 'maxLength':
          validatorsToAdd.push(Validators.maxLength(value));
          break;
        case 'pattern':
          validatorsToAdd.push(Validators.pattern(value));
          break;
        case 'nullValidator':
          if (value) {
            validatorsToAdd.push(Validators.nullValidator);
          }
          break;
        default:
          break;
      }
    }
  }
  autoSlash(val: KeyboardEvent) {
    Util.autoSlashDate(val);
  }
}
