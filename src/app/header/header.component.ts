import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
    `
      .boldFont {
        font-weight: 600;
      }
    `,
  ],
})
export class HeaderComponent {
  @Output() featureSelected = new EventEmitter<string>();
  bold: string = '';

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
    this.bold = feature;
  }

  collapsed = true;
}
