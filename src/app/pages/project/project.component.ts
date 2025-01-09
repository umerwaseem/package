import { Component, TemplateRef } from '@angular/core';
import { ProjectListComponent } from '../../elements/short-cods/project-list/project-list.component';
import { RouterLink } from '@angular/router';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    NgbModule,
    RouterLink,
    ProjectListComponent
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  active = 1
  ListType: boolean = false;
  constructor(private modalService: NgbModal) { }
  openCenter(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: false });
  }

  listType(val: any) {
    if (val == 'boxed') {
      this.ListType = true;
    } else {
      this.ListType = false;
    }
  }
}
