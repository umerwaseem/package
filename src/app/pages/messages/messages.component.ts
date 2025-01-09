import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
interface type {
  image: string,
  name: string,
  time: string,
  status: string,
  desc: string,
}
@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    RouterLink,
    NgbModule
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  active = 1;

  all_message: type[] = [
    {
      image: 'assets/images/profile/Untitled-2.jpg',
      name: 'Olivia Rellaq',
      time: '25m ago',
      status: 'active',
      desc:'Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
    {
      image: 'assets/images/profile/Untitled-1.jpg',
      name: 'Roberto Charloz',
      time: '2m ago',
      status: 'active',
      desc:'Hey, check my design update last night. Tell me what you think and if that is OK. I hear client said they want to change the layout concept'
    },
    {
      image: 'assets/images/profile/Untitled-3.jpg',
      name: 'Laura Chyan',
      time: '25m ago',
      status: 'pending',
      desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut'
    },
    {
      image: 'assets/images/profile/Untitled-2.jpg',
      name: 'Keanu Tipes',
      time: '25m ago',
      status: 'active',
      desc:'Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
    {
      image: 'assets/images/profile/Untitled-4.jpg',
      name: 'Olivia Rellaq',
      time: '2m ago',
      status: 'active',
      desc:'Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
    {
      image: 'assets/images/profile/Untitled-7.jpg',
      name: 'Laura Chyan',
      time: '25m ago',
      status: 'pending',
      desc:'Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    }
  ]
  unread_message: type[] = [
    {
      image: 'assets/images/profile/Untitled-1.jpg',
      name: 'Roberto Charloz',
      time: '2m ago',
      status: 'active',
      desc:'Hey, check my design update last night. Tell me what you think and if that is OK. I hear client said they want to change the layout concept.'
    },
    {
      image: 'assets/images/profile/Untitled-1.jpg',
      name: 'Keanu Tipes',
      time: '2m ago',
      status: 'active',
      desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut'
    },
    {
      image: 'assets/images/profile/Untitled-3.jpg',
      name: 'Olivia Rellaq',
      time: '25m ago',
      status: 'pending',
      desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut'
    },
    {
      image: 'assets/images/profile/Untitled-2.jpg',
      name: 'Olivia Rellaq',
      time: '25m ago',
      status: 'active',
      desc:'Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    }
  ]
  archived_message: type[] = [
    {
      image: 'assets/images/profile/Untitled-1.jpg',
      name: 'Laura Chyan',
      time: '2m ago',
      status: 'active',
      desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut'
    },
    {
      image: 'assets/images/profile/Untitled-2.jpg',
      name: 'Keanu Tipes',
      time: '2m ago',
      status: 'active',
      desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut'
    },
    {
      image: 'assets/images/profile/Untitled-3.jpg',
      name: 'Olivia Rellaq',
      time: '25m ago',
      status: 'active',
      desc:'Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
    {
      image: 'assets/images/profile/Untitled-1.jpg',
      name: 'Olivia Rellaq',
      time: '25m ago',
      status: 'active',
      desc:'Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    }
  ]
}
