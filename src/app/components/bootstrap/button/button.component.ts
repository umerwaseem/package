import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../elements/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [BreadcrumbComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  breadcrumbList = {
    breadcrumb_path: 'Bootstrap',
    currentURL: 'Buttons',
  }
}
