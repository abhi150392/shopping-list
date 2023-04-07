import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDirective]',
})
export class BasicDirective implements OnInit {
  constructor(private elementRef: ElementRef, private render: Renderer2) {}
  ngOnInit(): void {
    // this.elementRef.nativeElement.style.background = 'red';
    this.render.setStyle(
      this.elementRef.nativeElement,
      'backgroundColor',
      'green'
    );
  }
}
