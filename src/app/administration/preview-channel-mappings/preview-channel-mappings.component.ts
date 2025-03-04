import { Component } from '@angular/core';

@Component({
  selector: 'app-preview-channel-mappings',

  templateUrl: './preview-channel-mappings.component.html',
  styleUrl: './preview-channel-mappings.component.css'
})
export class PreviewChannelMappingsComponent {
  selectedTab: string = 'Preview Message Field Mapping';

  onTabChange(event: any) {
    this.selectedTab = this.tabs[event.index].label;  // Get selected tab label
  }
  tabs = [ 

    { label: 'Preview Message Field Mapping' , type: 'Preview Message Field Mapping'},
    { label: 'Preview Message Routing' , type: 'Preview Message Routing'},   



/*     { label: 'Tags' } */
  ];

}
