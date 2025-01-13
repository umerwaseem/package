import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../../../services/api.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dummy-expandable-table',
  templateUrl: './dummy-expandable-table.component.html',
  styleUrls: ['./dummy-expandable-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DummyExpandableTableComponent implements OnInit {
/*   dataSource = new MatTableDataSource<any>();;
  columnsToDisplayWithExpand = ['position', 'name', 'weight', 'symbol'];
  columnVisibility: { [key: string]: boolean } = {};
  expandedElement: PeriodicElement | null = null;
  networkGroupId: any
  isData: any
  instanceDetails: any = {} */


  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  columnVisibility: { [key: string]: boolean } = {};
  expandedElement!: PeriodicElement | null;

  constructor(private service: ApiService) {}

  ngOnInit(): void {
    // this.getPosts();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Properly applies filtering
  }
/*
  getPosts(): void {
    this.service.getPosts().subscribe(
      (res) => {
        if (res['ResponseCode'] === '00') {
          this.dataSource.data = res['Data']; // Assign API data to the table
          console.log('this.dataSource.data', this.dataSource.data);

          const networkDetail = res['Data']?.networkDetail || []; // Access networkDetail correctly
          console.log('networkDetail', networkDetail);

          this.initializeColumns(res['Data']); 
        }
      },
      (ex: HttpErrorResponse) => {
        this.service.refreshToken(ex.status).then(() => this.getPosts());
      }
    );
  }

    initializeColumns(data: any[]): void {
      if (data.length > 0) {
        this.columnsToDisplayWithExpand = Object.keys(data[0]); // Extract column keys from the first data row
        this.columnsToDisplayWithExpand.forEach((col) => {
          this.columnVisibility[col] = true; // Make all columns visible by default
        });
        this.columnVisibility['expandedDetail'] = true; 
  
      }
      return
    }
  get visibleColumns(): string[] {
    return this.columnsToDisplayWithExpand.filter((col) => this.columnVisibility[col]);
  }

  toggleExpand(element: PeriodicElement): void {
    console.log('element');
    
    this.expandedElement = this.expandedElement === element ? null : element;
    this.getInstanceDataById();
  }



  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getRecord(val: any) {
    console.log('val', val);
    if (val) {
      this.networkGroupId = val
      this.toggleExpand( this.networkGroupId)
    
    }
  }

  getInstanceDataById(): void {
    console.log('Fetching instance data for ID:', this.networkGroupId);

    this.service.getInstanceDetailsById(this.networkGroupId).subscribe(
      (res) => {
        console.log('API Response:', res);
        if (res['ResponseCode'] === '00') {
          let respnseData = res['Data'];
        
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


  tabs = [
    { label: 'Details', type: 'details' },
    { label: 'Status and Alarm', type: 'form' },
    { label: 'Monitoring', type: 'table' },

    { label: 'Security' },
    { label: 'Networking' },
    { label: 'Storage' },
    { label: 'Tags' }
  ];
 */
}

interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description?: string;
}



const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
  },
  {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`,
  },
  {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`,
  },
  {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`,
  },
  {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    description: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`,
  },
  {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    description: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`,
  },
  {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    description: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`,
  },
  {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`,
  },
  {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    description: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
        conditions.`,
  },
  {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`,
  },
];