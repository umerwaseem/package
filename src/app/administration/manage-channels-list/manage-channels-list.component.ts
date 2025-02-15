import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-manage-channels-list',

  templateUrl: './manage-channels-list.component.html',
  styleUrl: './manage-channels-list.component.css'
})
export class ManageChannelsListComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //dataSource = new MatTableDataSource<any>(); // Data source for the table
    dataSource = new MatTableDataSource(ELEMENT_DATA);
  displayedColumns: string[] = []; // Columns to display dynamically
  columnVisibility: { [key: string]: boolean } = {}; // Visibility for each column
  networkGroupId: any
  instanceDetails: any = {}

    form = new FormGroup({
      firstName: new FormControl('',),

      channelName: new FormControl('',),
      channelIndentifier: new FormControl('',),
      channelType: new FormControl('',),
      bin: new FormControl('',),
      endpointType: new FormControl('',),
      channelFormat: new FormControl('',),
      channelTimeout: new FormControl('',),
    //  channelIndentifier: new FormControl('',[ Validators.required]),
    })
  constructor(private service: ApiService,) { }
  ngOnInit(): void {
    this.getPosts();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onSubmit() {
    console.log('Form Data:', this.form.value);
  }
  getPosts(): void {
    this.service.getPosts().subscribe(
      (res) => {
        if (res['ResponseCode'] === '00') {
          this.dataSource.data = res['Data']; // Assign API data to the table
          console.log('this.dataSource.data', this.dataSource.data);

          const networkDetail = res['Data']?.networkDetail || []; // Access networkDetail correctly
          console.log('networkDetail', networkDetail);

          this.initializeColumns(res['Data']); // Initialize columns
          /*           this.datasource1.data = networkDetail; // Assign network details to another datasource
                    console.log('this.datasource1.data', this.datasource1.data); */
        }
      },
      (ex: HttpErrorResponse) => {
        this.service.refreshToken(ex.status).then(() => this.getPosts());
      }
    );
  }

  initializeColumns(data: any[]): void {
    if (data.length > 0) {
      this.displayedColumns = Object.keys(data[0]); // Extract column keys from the first data row
      this.displayedColumns.forEach((col) => {
        this.columnVisibility[col] = true; // Make all columns visible by default
      });

      // Ensure 'networkGroupId' is always visible
      if (this.columnVisibility['networkGroupId'] === undefined) {
        this.columnVisibility['networkGroupId'] = true;
      }
    }
    return
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  get visibleColumns(): string[] {
    // Filter columns based on visibility
    return this.displayedColumns.filter((col) => this.columnVisibility[col]);
  }

  filterToSingleRow(row: any): void {
    // Filter table to show only the selected row
    this.dataSource.data = [row];
    this.networkGroupId = row.networkGroupId;
  }

  resetTable(): void {
    // Reset table to show all rows
    this.networkGroupId = ''
    this.getPosts();
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

const ELEMENT_DATA = [
  {
    "ResponseCode": "00",
    "Data": [
        {
            "value": 15,
            "strValue": null,
            "text": "Mastercard",
            "attr1": null,
            "attr2": null,
            "institutionId": null,
            "fileType": null,
            "useCase": null
        },
        {
            "value": 33,
            "strValue": null,
            "text": "VISA",
            "attr1": null,
            "attr2": null,
            "institutionId": null,
            "fileType": null,
            "useCase": null
        },
        {
            "value": 37,
            "strValue": null,
            "text": "Stripe",
            "attr1": null,
            "attr2": null,
            "institutionId": null,
            "fileType": null,
            "useCase": null
        },
        {
            "value": 38,
            "strValue": null,
            "text": "Host network",
            "attr1": null,
            "attr2": null,
            "institutionId": null,
            "fileType": null,
            "useCase": null
        },
        {
            "value": 39,
            "strValue": null,
            "text": "Paypal",
            "attr1": null,
            "attr2": null,
            "institutionId": null,
            "fileType": null,
            "useCase": null
        },
        {
            "value": 60,
            "strValue": null,
            "text": "network test license",
            "attr1": null,
            "attr2": null,
            "institutionId": null,
            "fileType": null,
            "useCase": null
        },
        {
            "value": 66,
            "strValue": null,
            "text": "network",
            "attr1": null,
            "attr2": null,
            "institutionId": null,
            "fileType": null,
            "useCase": null
        },
        {
            "value": 68,
            "strValue": null,
            "text": "network to test",
            "attr1": null,
            "attr2": null,
            "institutionId": null,
            "fileType": null,
            "useCase": null
        },
        {
            "value": 78,
            "strValue": null,
            "text": "StripeForPayoutFile",
            "attr1": null,
            "attr2": null,
            "institutionId": null,
            "fileType": null,
            "useCase": null
        }
    ]
}
];