import { Component, input, signal } from '@angular/core';
import { Widget } from '../../model/dashboard';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WidgetOptionsComponent } from './widget-options/widget-options.component';
import { CdkDrag, CdkDragPlaceholder } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, WidgetOptionsComponent, CdkDrag, CdkDragPlaceholder],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.css',
  host: {
    '[style.grid-area]': 'gridArea'
  }
})
export class WidgetComponent {
data = input.required<Widget>();
showOptions = signal(false);
get gridArea(): string {
  return `span ${this.data()?.rows ?? 1} / span ${this.data()?.columns ?? 1}`;
}
}
