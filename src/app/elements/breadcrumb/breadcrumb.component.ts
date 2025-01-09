import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css'
})
export class BreadcrumbComponent {

  @Input() breadcrumb: any = '';
  title?: string = '';
  subTitle?: string = '';
  currentURL?: string = '';
  breadcrumb_path?: string = '';
  ngOnInit() {
    this.title = this.breadcrumb.title ? this.breadcrumb.title : 'Hi, welcome back!';
    this.subTitle = this.breadcrumb.subTitle ? this.breadcrumb.subTitle : 'Your business dashboard template';
    this.breadcrumb_path = this.breadcrumb.breadcrumb_path;
    this.currentURL = this.breadcrumb.currentURL;
  }

}
