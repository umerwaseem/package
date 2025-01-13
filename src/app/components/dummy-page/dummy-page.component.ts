import { CommonModule, NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggle, MatButtonToggleModule } from '@angular/material/button-toggle';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-dummy-page',
  //standalone: true,

  templateUrl: './dummy-page.component.html',
  styleUrl: './dummy-page.component.css',
  encapsulation: ViewEncapsulation.None,
  providers: [provideNativeDateAdapter()],
  /* imports: [
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
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule, MatSelectModule, MatDividerModule, MatButtonModule, MatTooltipModule, MatIconModule
  ], */
})
export class DummyPageComponent implements OnInit {
  @ViewChild('group') toggle!: MatButtonToggle;
  networkGroupId: any
  isData: any
  instanceDetails: any = {}
  isformData: any
  step = 0;
  form = new FormGroup({
    firstName: new FormControl(''),
    field2: new FormControl(''),
  })
  dataSource = new MatTableDataSource<any>(); // Data source for the table
  displayedColumns: string[] = []; // Columns to display dynamically
  columnVisibility: { [key: string]: boolean } = {}; // Visibility for each column
  datasource1 = new MatTableDataSource<any>();
  constructor(private service: ApiService,) { }

  ngOnInit(): void {
    this.getPosts();
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
        this.datasource1.data = networkDetail; // Assign network details to another datasource
        console.log('this.datasource1.data', this.datasource1.data);
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

  get visibleColumns(): string[] {
    // Filter columns based on visibility
    return this.displayedColumns.filter((col) => this.columnVisibility[col]);
  }
  tabs = [
    { label: 'Channels & Endpoint', type: 'details' },
    { label: 'Channel Queues & Services', type: 'form' },
    { label: 'Message & Identification', type: 'table' },

    { label: 'Custom Fields' },
    { label: 'Message field Mapping' },
    { label: 'Message Routine & Processing' },
    { label: 'Tags' }
  ];

  tableData = [
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Smith', age: 30 },
    { id: 3, name: 'Mike Johnson', age: 35 },
  ];




  getRecord(val: any) {
    console.log('val', val);
    if (val) {
      //this.isData = val
      this.networkGroupId = val
      this.getInstanceDataById();
    }
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

  getFormRecord(val: any) {
    if (val) {
      this.isformData = val
      console.log('val', val);

    }
  }

  onSubmit() {
    console.log('Form Data:', this.form.value);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  getInstanceDataById(): void {
    console.log('Fetching instance data for ID:', this.networkGroupId);

    this.service.getInstanceDetailsById(this.networkGroupId).subscribe(
      (res) => {
        console.log('API Response:', res);
        if (res['ResponseCode'] === '00') {
          let respnseData = res['Data'];
          /*     respnseData.forEach((data: any) => {
                data.jsonParseData = JSON.parse(data.jsonData); 
              });
 */
          console.log(" respnseData ->", respnseData);

          this.instanceDetails = respnseData;
          console.log(" this.instanceDetails -> after parsing -> ", this.instanceDetails.instance);
          this.initializeColumns(respnseData);
        }

      },
      (ex: HttpErrorResponse) => {
        console.error('HTTP Error:', ex);
        this.service.refreshToken(ex.status).then(() => this.getInstanceDataById());
      }
    );
  }


}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
export interface Tab {
  label: string;
  isNew?: boolean; // Optional to display "New" badge
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },

];
