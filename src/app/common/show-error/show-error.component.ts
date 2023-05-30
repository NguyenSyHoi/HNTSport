import { AbstractControl, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-show-error',
  templateUrl: './show-error.component.html',
  styleUrls: ['./show-error.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslocoModule],
})
export class ShowErrorComponent {
  @Input() control: AbstractControl = new FormControl();
  @Input() controlName: string = '';
  @Input() minLength: number | string | undefined = '';
  @Input() maxLength: number | string | undefined = '';
  get errorKey() {
    return (this.control && this.control.errors) ? Object.keys(this.control.errors)[0] : '';
  }
}
