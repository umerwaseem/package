import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { count } from 'rxjs';
interface listType {
  id: string,
  product_name: string,
  product_bg_img?: string,
  date: string,
  client_name: string,
  client_image?: string,
  person_name: string,
  person_image?: string,
  deadline_date: string,
  status: string
}

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    NgbModule,
    NgbDropdownModule,
    RouterLink
  ],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent {

  @Input() data: any;
  @Input() boxed_navpills: boolean = false;

  productList: any = [];

  ngOnInit() {
    this.productList = this.allproduct.filter(item => {
      return this.data === 'all' ? item : item.status === this.data;
    });
  }

  deleteProject(id: any) {
    this.productList.map((val: any, i: any) => {
      if (id == i) {
        this.productList.splice(id, 1);
      }
    });
  }

  allproduct: listType[] = [
    {
      id: '#P-000441425',
      product_name: 'Redesign Kripton Mobile App',
      product_bg_img: 'assets/images/big/img1.jpg',
      date: 'Created on Sep 8th, 2020',
      client_image: 'assets/images/projects/Untitled-1.jpg',
      client_name: 'Alex Noer',
      person_image: 'assets/images/projects/Untitled-2.jpg',
      person_name: 'Yoast Esec',
      deadline_date: 'Tuesday,Sep 29th 2020',
      status: 'Pending'
    },
    {
      id: '#P-000441425',
      product_name: 'Build Branding Persona for Etza.id',
      product_bg_img: 'assets/images/big/img2.jpg',
      date: 'Created on Sep 8th, 2020',
      client_image: 'assets/images/projects/Untitled-3.jpg',
      client_name: 'Kevin Sigh',
      person_image: 'assets/images/projects/Untitled-4.jpg',
      person_name: 'Kevin Sigh',
      deadline_date: 'Tuesday,Sep 29th 2020',
      status: 'Progress'
    },
    {
      id: '#P-000441425',
      product_name: 'Manage SEO for Eclan Company P..',
      product_bg_img: 'assets/images/big/img3.jpg',
      date: 'Created on Sep 8th, 2020',
      client_name: 'Angela Moss',
      person_image: 'assets/images/projects/Untitled-5.jpg',
      person_name: 'Olivia Jonson',
      deadline_date: 'Tuesday,Sep 29th 2020',
      status: 'Pending'
    },
    {
      id: '#P-000441425',
      product_name: 'Reduce Website Page Size Omah',
      product_bg_img: 'assets/images/big/img4.jpg',
      date: 'Created on Sep 8th, 2020',
      client_name: 'Endge Aes',
      person_name: 'Bella Sirait',
      deadline_date: 'Tuesday,Sep 29th 2020',
      status: 'Pending'
    },
    {
      id: '#P-000441425',
      product_name: 'Build Branding Persona for Etza.id',
      product_bg_img: 'assets/images/big/img5.jpg',
      date: 'Created on Sep 8th, 2020',
      client_image: 'assets/images/projects/Untitled-6.jpg',
      client_name: 'Kevin Sigh',
      person_image: 'assets/images/projects/Untitled-7.jpg',
      person_name: 'Kevin Sigh',
      deadline_date: 'Tuesday,Sep 29th 2020',
      status: 'Closed'
    },
    {
      id: '#P-000441425',
      product_name: 'Manage SEO for Eclan Company P..',
      product_bg_img: 'assets/images/big/img6.jpg',
      date: 'Created on Sep 8th, 2020',
      client_image: 'assets/images/projects/Untitled-8.jpg',
      client_name: 'Angela Moss',
      person_name: 'Olivia Jonson',
      deadline_date: 'Tuesday,Sep 29th 2020',
      status: 'Pending'
    },
    {
      id: '#P-000441425',
      product_name: 'Build Branding Persona for Etza.id',
      product_bg_img: 'assets/images/big/img7.jpg',
      date: 'Created on Sep 8th, 2020',
      client_image: 'assets/images/projects/Untitled-9.jpg',
      client_name: 'Kevin Sigh',
      person_name: 'Kevin Sigh',
      deadline_date: 'Tuesday,Sep 29th 2020',
      status: 'Progress'
    }
  ]
}
