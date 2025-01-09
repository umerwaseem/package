import { Component, HostListener } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ChatboxComponent } from '../chatbox/chatbox.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavHeaderComponent } from '../nav-header/nav-header.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    NgClass,
    RouterOutlet,
    NavHeaderComponent,
    ChatboxComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
  toggleVal: boolean = false;
  mouseOvered: boolean = false;
  sidebarToggle(eventData: { toggleVal: boolean }) {
    this.toggleVal = eventData.toggleVal;
    setTimeout(() => {
      this.handleMinHeight();
    }, 500)
  }
  iconHoverToggle(val: any) {
    this.mouseOvered = val;
  }

  currentItem: string = '';
  currentRoute: string = '';
  dashboardTitle(value: any) {
    setTimeout(() => {
      this.currentItem = value.title;
      this.currentRoute = value.router;
    }, 100);
  }

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      setTimeout(() => {
        this.handleMinHeight();
      }, 500)
    });
  }

  // Control only mini sidebar handle Function ----
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.handleMinHeight();
  }

  handleMinHeight() {
    const win_h = window.outerHeight || screen.height;
    const contentBody = document.getElementsByClassName('content-body')[0] as HTMLElement;
    if (win_h > 0) {
      contentBody.style.minHeight = (window.innerHeight - 60) + "px";
      const bodyDataSidebarStyle = document.body.getAttribute('data-sidebar-style');
      const mainWrapperID = document.getElementById('main-wrapper')?.className;
      const metismenuHeight = document.querySelector('.deznav .metismenu')?.clientHeight || 0;
      if (
        bodyDataSidebarStyle === "mini" && metismenuHeight > (window.innerHeight - 60) ||
        bodyDataSidebarStyle === "modern" && metismenuHeight > (window.innerHeight - 60) ||
        bodyDataSidebarStyle === "full" && mainWrapperID === 'show menu-toggle' && metismenuHeight > (window.innerHeight - 60)
      ) {
        contentBody.style.minHeight = (metismenuHeight + 100) + "px";
      }
    }
  }
}
