import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, NgClass, TitleCasePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { WgTimeline1Component } from '../widget/list/wg-timeline-1/wg-timeline-1.component';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
@Component({
  selector: 'app-header',
  standalone: true,
    encapsulation: ViewEncapsulation.None,
  
  imports: [
    CommonModule,
    RouterLink,
    NgbModule,
    TitleCasePipe,
    WgTimeline1Component,
  
        CommonModule,
        MatExpansionModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDatepickerModule,
        MatTableModule,
        MatTabsModule,
        ReactiveFormsModule,
        RouterLink,
            NgClass, 
        
     
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() dashboardTitle: any;

  fullScreenClass: boolean = false;
  toggleMode: any;
  elementValue: any;
  localData: any = '';
  currentTitle: string = '';
form= new FormGroup({
    field1: new FormControl(''),
    field2: new FormControl(''),
  })
  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params: any) => {
      if (params.theme == 'dark' || params.theme == 'light') {
        localStorage.setItem("data-theme-version", params.theme);
      }
    });
  }

  ngAfterContentChecked() {
    if (this.router.url == '/admin') {
      this.currentTitle = 'Dashboard';
    } else {
      this.currentTitle = this.dashboardTitle ? this.dashboardTitle : 'DashBoard';
    }
  }

  ngDoCheck() {
    this.themeMode2();
  }

  themeMode2() {    // Theme mode dark - light
    this.localData = localStorage.getItem('data-theme-version');
    if (this.localData != null) {
      document.body.setAttribute('data-theme-version', this.localData);
    }
  }

  chatboxActive() { // Chatbox manage
    document.getElementById("chatBox")?.setAttribute("class", "chatbox active");
  }
  eventSidebarActive() { // Event Sidebar manage
    if (document.getElementById("eventSidebar")?.getAttribute('class') == 'event-sidebar dz-scroll') {
      document.getElementById("eventSidebar")?.setAttribute("class", "event-sidebar dz-scroll active");
    } else {
      document.getElementById("eventSidebar")?.setAttribute("class", "event-sidebar dz-scroll");
    }
  }

  urlActive(url: any) {
    if (url == '/admin') {
      this.currentTitle = 'Dashboard';
    } else {
      this.currentTitle = url.split('/admin/')[1].split('?')[0].replace('-', ' ');
    }
  }

}
