import { Directive, ElementRef, Renderer2, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appResizeColumn]',
  standalone: true,
})
export class ResizeColumnDirective {
  private initialX: number=0;
  private currentWidth: number=0;

  constructor(private el: ElementRef) { }

  @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent) {
    this.initialX = event.clientX;
    this.currentWidth = this.el.nativeElement.offsetWidth;
  }

  @HostListener('mouseup', ['$event']) onMouseUp(event: MouseEvent) {
    let finalX = event.clientX;
    let delta = finalX - this.initialX;
    this.el.nativeElement.style.width = this.currentWidth + delta + 'px';
  }
}
