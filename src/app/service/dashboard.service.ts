import { Injectable, signal } from '@angular/core';
import { Widget } from '../model/dashboard';
import { UserInfoComponent } from '../dashboard/user-info/user-info.component';
import { BalanceComponent } from '../dashboard/balance/balance.component';
import { QuickLinksComponent } from '../dashboard/quick-links/quick-links.component';
import { ExpenditureComponent } from '../dashboard/expenditure/expenditure.component';
import { PaymentApprovalComponent } from '../dashboard/payment-approval/payment-approval.component';
import { MiniStatementComponent } from '../dashboard/mini-statement/mini-statement.component';

@Injectable()
export class DashboardService {
  widgets = signal<Widget[]>([ 
  {
    id: 1,
    label: 'Widget 1',
    content: UserInfoComponent,
    rows: 1,
    columns: 4
  },
  {
    id: 2,
    label: 'Widget 2',
    content: BalanceComponent,
    rows: 2,
    columns: 2
  },
  {
    id: 3,
    label: 'Widget 3',
    content: QuickLinksComponent,
    rows: 1,
    columns: 2
  },
  {
    id: 4,
    label: 'Widget 4',
    content: ExpenditureComponent,
    rows: 3,
    columns: 1
  },
  {
    id: 5,
    label: 'Widget 5',
    content: PaymentApprovalComponent,
    rows: 3,
    columns: 1
  },
  {
    id: 6,
    label: 'Widget 6',
    content: MiniStatementComponent,
    rows: 2,
    columns: 2
  }
]);
  constructor() { }

  updateWidget(id: number, widget: Partial<Widget>) {
    const index = this.widgets().findIndex(w => w.id === id);
    if (index !== -1) {
      const newWidgets = [...this.widgets()];
      newWidgets[index] = { ...newWidgets[index], ...widget };
      this.widgets.set(newWidgets);
    }
  }

  moveWidgetToRight(id: number) {
    const index = this.widgets().findIndex(w => w.id === id);
    if (index === this.widgets().length - 1) {
      return;
    }
    const newWidgets = [...this.widgets()];
    [newWidgets[index], newWidgets[index + 1]] = [{...newWidgets[index + 1]}, {...newWidgets[index]}];
    this.widgets.set(newWidgets);
  }


  moveWidgetToLeft(id: number) {
    const index = this.widgets().findIndex(w => w.id === id);
    if (index === 0) {
      return;
    }
    const newWidgets = [...this.widgets()];
    [newWidgets[index], newWidgets[index - 1]] = [{...newWidgets[index - 1]}, {...newWidgets[index]}];
    this.widgets.set(newWidgets);
  }

  updateWidgetPosition(sourceWidgetId: number, targetWidgetId: number) {
    const sourceIndex = this.widgets().findIndex(w => w.id === sourceWidgetId);
    if(sourceIndex === -1) {
      return;
    }
   const newWidgets = [...this.widgets()];
   const sourceWidget = newWidgets.splice(sourceIndex, 1)[0];
   const targetIndex = newWidgets.findIndex(w => w.id === targetWidgetId);
   if(targetIndex === -1) {
    return;
   }
   const insertAt = targetIndex == sourceIndex ? targetIndex + 1 : targetIndex;
   newWidgets.splice(insertAt, 0, sourceWidget);
   this.widgets.set(newWidgets);
  }
}
