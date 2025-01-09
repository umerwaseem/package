import { CommonModule, NgClass } from '@angular/common';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dummy-table',
  standalone: true,
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
   // BrowserAnimationsModule ,
    MatTabsModule,
    ReactiveFormsModule,
    RouterLink,FormsModule,      
    NgClass, MatMenuModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatTableModule, 
    MatPaginatorModule, 
    MatSelectModule, 
    MatDividerModule, 
    MatButtonModule, 
    MatTooltipModule, 
    MatIconModule
  ],
  templateUrl: './dummy-table.component.html',
  styleUrl: './dummy-table.component.css'
})
export class DummyTableComponent {
  @ViewChild('group') toggle!: MatButtonToggle;
  dataSource1 = ELEMENT_DATA;
  dataSource2 = ELEMENT_DATA;

  dataSource3 = ELEMENT_DATA;
  displayedColumns: string[] = Object.keys(ELEMENT_DATA[0]);
  // Columns visibility mapping
  columnsVisibility:any = {
    position: true,
    name: true,
    weight: true,
    symbol: true,
  };

  // List of displayed columns (used by mat-header-row and mat-row)
  get displayedColumn(): string[] {
    return Object.keys(this.columnsVisibility).filter(key => this.columnsVisibility[key]);
  }

  // Toggle column visibility
  toggleColumn(column: string): void {
    this.columnsVisibility[column] = !this.columnsVisibility[column];
  }



  columnVisibility3: { [key: string]: boolean } = {};
  
  constructor() {
    // Initialize all columns to be visible by default
    this.displayedColumns.forEach((col) => (this.columnVisibility3[col] = true));
  }

  get visibleColumns(): string[] {
    return this.displayedColumns.filter((col) => this.columnVisibility3[col]);
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];