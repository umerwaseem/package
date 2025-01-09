import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../elements/breadcrumb/breadcrumb.component';
import { ProfileHeadComponent } from '../../../elements/short-cods/apps/profile-head/profile-head.component';
import { ProfileSidMenuComponent } from '../../../elements/short-cods/apps/profile-sid-menu/profile-sid-menu.component';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    ProfileHeadComponent,
    ProfileSidMenuComponent,
  ],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetailsComponent {
  breadcrumbList = {
    title: 'Hi, welcome back!',
    subTitle: 'Post Details',
    breadcrumb_path: 'Advanced',
    currentURL: 'Post Details',
  }
  profileDetailArray = {
    name:'Mitchell C. Shay',
    email: 'info@example.com'
  }
}
