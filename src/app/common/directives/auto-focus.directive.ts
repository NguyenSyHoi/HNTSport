import { AfterContentInit, Directive, ElementRef, Input, QueryList, ChangeDetectorRef, NgZone } from '@angular/core';

@Directive({
  selector: '[vtAutofocus]',
  standalone:true
})
export class AutofocusDirective implements AfterContentInit {
  constructor(
    private el: ElementRef,
    private cdf: ChangeDetectorRef,
  ) { }
  ngAfterContentInit() {
    let classes: string = this.el.nativeElement.classList.value;
    setTimeout(() => {
      if (classes.indexOf('ant-select') !== -1) {
        this.el.nativeElement.firstElementChild.firstElementChild.querySelector('input').focus();
        return
      }
      this.el.nativeElement.focus();
    }, 500)
  }

}
