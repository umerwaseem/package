import { Component } from '@angular/core';
import { EmailLeftBodyComponent } from '../../../../elements/short-cods/apps/email-left-body/email-left-body.component';
import { BreadcrumbComponent } from '../../../../elements/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-read',
  standalone: true,
  imports: [BreadcrumbComponent, EmailLeftBodyComponent],
  templateUrl: './read.component.html',
  styleUrl: './read.component.css'
})
export class ReadComponent {
  email: string = 'info@example.com';

  breadcrumbList = {
    subTitle: 'Email',
    breadcrumb_path: 'Email',
    currentURL: 'Read',
  }
}
