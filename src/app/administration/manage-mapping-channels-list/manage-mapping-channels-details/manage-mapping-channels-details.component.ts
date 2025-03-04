import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-mapping-channels-details',

  templateUrl: './manage-mapping-channels-details.component.html',
  styleUrl: './manage-mapping-channels-details.component.css'
})
export class ManageMappingChannelsDetailsComponent {
  selectedTab: string = 'Message Field Mapping';

  onTabChange(event: any) {
    this.selectedTab = this.tabs[event.index].label;  // Get selected tab label
  }
  tabs = [

    { label: 'Message Field Mapping' , type: 'Message Field Mapping'},
    { label: 'Message Routing' , type: 'Message Routing'},   
    { label: 'Message Processing Rules' , type: 'Message Processing Rules'},


/*     { label: 'Tags' } */
  ];

}
