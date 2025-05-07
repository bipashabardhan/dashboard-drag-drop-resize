import { Component, inject } from '@angular/core';
import { WidgetComponent } from "../components/widget/widget.component";
import { DashboardService } from '../service/dashboard.service';
import { CdkDragDrop, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [WidgetComponent,CdkDropList, CdkDropListGroup],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [DashboardService]
})
export class DashboardComponent {
  store = inject(DashboardService);

  drop(event: CdkDragDrop<number, any>) {
    const { previousContainer, container } = event;   
    this.store.updateWidgetPosition(previousContainer.data, container.data); 
  }
}
