import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../../elements/breadcrumb/breadcrumb.component';
import { CommonModule, CurrencyPipe, NgClass, NgFor } from '@angular/common';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
interface type {
  img: string;
  title: string;
  discount: number;
  price: number;
  rating: number;
}
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    NgbModule,
    CurrencyPipe,
    BreadcrumbComponent,
    CommonModule,
    RouterLink,
    CarouselModule
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  active = 1;

  breadcrumbList = {
    breadcrumb_path: 'Layout',
    currentURL: 'Blank',
  }
  constructor(private modalService: NgbModal) { }

  open(content: any) {
    this.modalService.open(content, { centered: false });
  }

  productData: type[] = [
    {
      img: 'assets/images/product/1.jpg',
      title: 'Bonorum et Malorum',
      discount: 761,
      price: 159,
      rating: 4
    },
    {
      img: 'assets/images/product/2.jpg',
      title: 'Bonorum et Malorum',
      discount: 159,
      price: 159,
      rating: 3
    },
    {
      img: 'assets/images/product/3.jpg',
      title: 'Bonorum et Malorum',
      discount: 357,
      price: 159,
      rating: 5
    },
    {
      img: 'assets/images/product/4.jpg',
      title: 'Bonorum et Malorum',
      discount: 654,
      price: 159,
      rating: 4
    },
    {
      img: 'assets/images/product/5.jpg',
      title: 'Bonorum et Malorum',
      discount: 369,
      price: 149,
      rating: 2
    },
    {
      img: 'assets/images/product/6.jpg',
      title: 'Bonorum  Malorum withe',
      discount: 240,
      price: 149,
      rating: 5
    },
    {
      img: 'assets/images/product/7.jpg',
      title: 'Bonorum et Malorum',
      discount: 364,
      price: 159,
      rating: 3
    },
    {
      img: 'assets/images/product/1.jpg',
      title: 'FLARE et Malorum',
      discount: 654,
      price: 159,
      rating: 4
    },
    {
      img: 'assets/images/product/2.jpg',
      title: 'Sake et Malorum',
      discount: 369.00,
      price: 149,
      rating: 5
    },
    {
      img: 'assets/images/product/5.jpg',
      title: 'Bonorum et Malorum',
      discount: 240,
      price: 149,
      rating: 2
    },
  ]

  customOptions: any = {
    loop: true,
    margin: 20,
    nav: false,
    autoplay: true,
    rtl: true,

    slideSpeed: 3000,
    paginationSpeed: 3000,
    dots: false,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 3
      },
      800: {
        items: 3
      },
      991: {
        items: 5
      }
    }
  }
}
