import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from '../../../services/utility.service';

@Component({
  selector: 'app-manage-institution-list',

  templateUrl: './manage-institution-list.component.html',
  styleUrl: './manage-institution-list.component.css'
})
export class ManageInstitutionListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<any>(); // Data source for the table
  displayedColumns: string[] = []; // Columns to display dynamically
  columnVisibility: { [key: string]: boolean } = {}; // Visibility for each column
  networkGroupId: any
  instanceDetails: any = {}


  pageTitle = 'Network Group'
  requestBehaviour = { AddNew: "N", Edit: "E", ViewSingle: "V", Approval: "A", Return: "R", MakerCheckerView: "MCV", FileApproval: "FA" };
  pageAccess: any = {};

  behaviour = "N";

  activeBehaviour: any = {
    addNew: false,
    edit: false,
    approval: false,
    view: false,
    return: false,
    makerCheckerView: false,
    fileApproval: false,
  };

  page = {
    totalElements: 100,
    size: 20,
    index: 0,
  }
  form = new FormGroup({
    institutionName: new FormControl(''),
    contactPersonName: new FormControl(''),
    contactPersonNumber: new FormControl(''),
    contactPersonId: new FormControl(''),
    contactPersonEmail: new FormControl(''),
    status: new FormControl(''),
    role: new FormControl(''),
    passwordPolicy: new FormControl(''),
  })
  constructor(private service: ApiService, private dialog: MatDialog, private route: ActivatedRoute, public router: Router, public util: UtilityService,) { }
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

  getNetworkGroupValue(networkGroupId: any) {
    console.log('networkGroupId ==>', networkGroupId);

    //this.service.getInstanceDetailsById(networkGroupId).subscribe((res: { [x: string]: any; }) => {
    this.service.getInstanceDetailsById(networkGroupId).subscribe(
      (res) => {
        if (res['ResponseCode'] == "00") {
          console.log('networkGroupId ppp ==>', networkGroupId);

          this.setValues(res['Data'])
          this.form.disable()

        }
      }, (ex: HttpErrorResponse) => {
        this.service.refreshToken(ex.status).then(
          () => this.getNetworkGroupValue(networkGroupId)
        )
      })
  }

  setValues(data: any) {
    if (data) {

      this.form.controls.institutionName.setValue(data.networkGroupDescription)
      this.form.controls.contactPersonName.setValue(data.networkGroupName)
      this.form.controls.contactPersonNumber.setValue(data.networkGroupCode)
      this.form.controls.contactPersonId.setValue(data.networkGroupId)
      this.form.controls.contactPersonEmail.setValue(data.networkGroupDescription)
      this.form.controls.status.setValue(data.networkGroupName)
      this.form.controls.role.setValue(data.networkGroupCode)
      this.form.controls.passwordPolicy.setValue(data.networkGroupId)



    }
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
    console.log('this.networkGroupId ==>', this.networkGroupId);

    this.getNetworkGroupValue(this.networkGroupId)
  }
  resetTable(): void {
    // Reset table to show all rows
    this.networkGroupId = ''
    this.getPosts();
  }
  setPaginator() {
    this.page.index = 0;
    this.page.size = 20;
  }

  pageEvent: PageEvent = new PageEvent;
  handlePageEvent(e: PageEvent) {


    this.page.index = e.pageIndex;
    this.page.size = e.pageSize;
    this.page.totalElements = e.length;
    // this.getAllNetworkGroup(this.searchForm.value, this.page.index, this.page.size)
  }

}
