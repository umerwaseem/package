import { CommonModule, NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
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
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
{
    name: 'Source Channel 2',
    children: [
      {
        name: 'Routing Channel 1',
        children: [
          {name: 'Destination Channel 1'},
          {name: 'Destination Channel 2'},
        ]
      }, {
        name: 'Routing Channel 2',
        children: [
          {name: 'Destination Channel 1'},
          {name: 'Destination Channel 2'},
        ]
      },
    ]
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}


@Component({
  selector: 'app-dummy-table',
 // standalone: true,

  /* imports: [
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
  ], */
  templateUrl: './dummy-table.component.html',
  styleUrl: './dummy-table.component.css'
})
export class DummyTableComponent implements OnInit {
 
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
  }
  transactionData = {
    transactionId: '123456',
    customerName: 'John Doe',
    status: 'Approved',
    panels: [
      {
        title: 'Source Channel 2',
        description: 'Details of Source Channel',
        children: [
          {
            title: 'Routing Channel ',
            description: 'Details of Routing Channel',
            children: [
              {
                title: 'Destination Channel',
                description: 'Details of Destination Channel'
              }
            ]
          }
        ]
      }
    ]
  };
}


