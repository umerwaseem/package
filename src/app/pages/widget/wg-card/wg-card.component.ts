import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../elements/breadcrumb/breadcrumb.component';
import { ActiveUsersComponent } from '../../../elements/widget/chart/active-users/active-users.component';

@Component({
  selector: 'app-wg-card',
  standalone: true,
  imports: [BreadcrumbComponent, ActiveUsersComponent],
  templateUrl: './wg-card.component.html',
  styleUrl: './wg-card.component.css'
})
export class WgCardComponent {
  breadcrumbList = {
    subTitle: 'Statistics',
    breadcrumb_path: 'Widget',
    currentURL: 'Statistics',
  }
}
