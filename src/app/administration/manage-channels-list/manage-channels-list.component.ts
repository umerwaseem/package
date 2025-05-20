import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, inject, Inject, signal, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../../services/api.service';
import { MatDialog, MAT_DIALOG_DATA,MatDialogRef  } from '@angular/material/dialog';
import { ViewEndpointDetailsDialogComponent } from './View-Dialog-Boxes/view-endpoint-details-dialog/view-endpoint-details-dialog.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { startWith, map, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from '../../../services/utility.service';

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
  channelId: any
  instanceDetails: any = {}
showChild: boolean = false;

  
 displayedColumnssss: string[] = ['position', 'name', 'weight', 'symbol','position', 'name', 'weight', 'symbol','position', 'name', 'weight', 'symbol'];
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
  filteredFruits: any;
  fruitCtrl: any;
  allFruits: any;
  constructor(   private service: ApiService,
      private dialog: MatDialog,
      private route: ActivatedRoute,
      public router: Router,
      public util: UtilityService) { 
    }
  _filter(fruit: string): any {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.getChannels();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onSubmit() {
    console.log('Form Data:', this.form.value);
  }
  getChannels(): void {
    this.service.getChannels().subscribe(
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
        this.service.refreshToken(ex.status).then(() => this.getChannels());
      }
    );
  }

  initializeColumns(data: any[]): void {
    if (data.length > 0) {
      this.displayedColumns = Object.keys(data[0]); // Extract column keys from the first data row
      this.displayedColumns.forEach((col) => {
        this.columnVisibility[col] = true; // Make all columns visible by default
      });

      // Ensure 'channelId' is always visible
      if (this.columnVisibility['channelId'] === undefined) {
        this.columnVisibility['channelId'] = true;
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
    this.channelId = row.channelId;
    this.showChild = !this.showChild;
  }

  resetTable(): void {
    // Reset table to show all rows
    this.channelId = ''
    this.getChannels();
    console.log();
    
  }
  tabs = [
    { label: 'Channels', type: 'Channels' },
    { label: 'Channel Endpoints', type: 'Channel Endpoints' },
    { label: 'Channel Queues', type: 'Channel Queues' },

    { label: 'Channel Services' , type: 'Channel Services'},
    { label: 'Field Definition' , type: 'Field Definition'},
    { label: 'Message Initialization' , type: 'Message Initialization'},
    
    
    { label: 'Custom Fields' , type: 'Custom Fields'},


/*     { label: 'Tags' } */
  ];

  viewEndPointDetails(val:any) {
    // let obj = { behaviour: "V", userData: val, channelId: this.form.controls.channelId.value };
    let obj = val;

    this.dialog.open(ViewEndpointDetailsDialogComponent, {
      width: '400px',
      height: '400px',
      // Ensure this is passed
    });
  }
  
  /// chip datA
  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly fruits = signal<Fruit[]>([{name: 'Lemon'}, {name: 'Lime'}, {name: 'Apple'}]);
  readonly announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.update(fruits => [...fruits, {name: value}]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    this.fruits.update(fruits => {
      const index = fruits.indexOf(fruit);
      if (index < 0) {
        return fruits;
      }

      fruits.splice(index, 1);
      this.announcer.announce(`Removed ${fruit.name}`);
      return [...fruits];
    });
  }

  edit(fruit: Fruit, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing fruit
    this.fruits.update(fruits => {
      const index = fruits.indexOf(fruit);
      if (index >= 0) {
        fruits[index].name = value;
        return [...fruits];
      }
      return fruits;
    });
  }


  addchannelDetails(){

    this.router.navigate([`/admin/manage-channel-details/N/0`]);

  }
}
export interface Fruit {
  name: string;
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

