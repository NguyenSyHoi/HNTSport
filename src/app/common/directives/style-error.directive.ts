import { FormControl } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { Directive, ElementRef, HostListener, Input, Renderer2, SimpleChanges } from '@angular/core';
@Directive({
  selector: '[appStyleError]',
  standalone: true,
})
export class StyleErrorDirective {
  @Input() control: AbstractControl = new FormControl('');
  constructor(
    private el: ElementRef,
    private render: Renderer2
  ) { }
  @HostListener('blur')
  @HostListener('keyup')
  onTouched() {
    this.checkValidControl();
  }
  checkValidControl() {
    if (this.control.invalid && (this.control.touched || this.control.dirty)) {
      this.render.addClass(this.el.nativeElement, 'errors');
    } else {
      this.render.removeClass(this.el.nativeElement, 'errors');
    }
  }
}
