import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-manage-channel-details',
 providers: [
     {
       provide: STEPPER_GLOBAL_OPTIONS,
       useValue: { showError: true },
     },
   ],
  templateUrl: './manage-channel-details.component.html',
  styleUrl: './manage-channel-details.component.css'
})
export class ManageChannelDetailsComponent {
  selectedTab: string = 'Channel Endpoints';

  onTabChange(event: any) {
    this.selectedTab = this.tabs[event.index].label;  // Get selected tab label
  }
  tabs = [
    { label: 'Channels', type: 'Channels' },
    { label: 'Channel Endpoints', type: 'Channel Endpoints' },
    { label: 'Channel Queues', type: 'Channel Queues' },
    { label: 'Channel Services' , type: 'Channel Services'},
    { label: 'Message Initialization' , type: 'Message Initialization'},
    { label: 'Custom Fields' , type: 'Custom Fields'},
    { label: 'Message Field Mapping' , type: 'Message Field Mapping'},
    { label: 'Message Routing' , type: 'Message Routing'},   
    { label: 'Message Processing Rules' , type: 'Message Processing Rules'},
    { label: 'Preview Configuration' , type: 'Preview Configuration'},

/*     { label: 'Tags' } */
  ];
}

