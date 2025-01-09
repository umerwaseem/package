import { CommonModule, NgClass } from '@angular/common';
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

@Component({
  selector: 'app-dummy-page',
  standalone: true,

  templateUrl: './dummy-page.component.html',
  styleUrl: './dummy-page.component.css',
  encapsulation: ViewEncapsulation.None,
  providers: [provideNativeDateAdapter()],
  imports: [
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
  ],
})
export class DummyPageComponent implements OnInit {
  @ViewChild('group') toggle!: MatButtonToggle;

  isData: any
  isformData:any
  step = 0;
  form = new FormGroup({
    firstName: new FormControl(''),
    field2: new FormControl(''),
  })
  constructor() {
  }
  ngOnInit(): void {

  }
  /*   tabs: Tab[] = [
      { label: 'Details' },
      { label: 'Status and alarms', isNew: true },
      { label: 'Monitoring' },
      { label: 'Security' },
      { label: 'Networking' },
      { label: 'Storage' },
      { label: 'Tags' }
    ];
   */
  tabs = [
    { label: 'Details', type: 'details' },
    { label: 'Status and Alarm', type: 'form' },
    { label: 'Monitoring', type: 'table' },
 
    { label: 'Security' },
    { label: 'Networking' },
    { label: 'Storage' },
    { label: 'Tags' }
  ];

  tableData = [
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Smith', age: 30 },
    { id: 3, name: 'Mike Johnson', age: 35 },
  ];


  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  getRecord(val: any) {
    if (val) {
      this.isData = val
      console.log('val', val);

    }
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
