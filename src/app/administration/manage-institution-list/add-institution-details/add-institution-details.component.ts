import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UtilityService } from '../../../../services/utility.service';
import { filter, pairwise } from 'rxjs';

@Component({
  selector: 'app-add-institution-details',

  templateUrl: './add-institution-details.component.html',
  styleUrl: './add-institution-details.component.css'
})
export class AddInstitutionDetailsComponent implements OnInit {
  requestBehaviour = {
    AddNew: 'N',
    Edit: 'E',
    ViewSingle: 'V',
    Approval: 'A',
    Return: 'R',
    MakerCheckerView: 'MCV',
    FileApproval: 'FA',
  };
  behaviour = "N";
  breadcrumbs = [];
  activeBehaviour: any = {
    addNew: false,
    edit: false,
    approval: false,
    view: false,
    return: false,
    makerCheckerView: false,
    fileApproval: false,
  };
  form = new FormGroup({
    institutionName: new FormControl('', [Validators.required]),
    contactPersonName: new FormControl('', [Validators.required]),
    contactPersonNumber: new FormControl('', [Validators.required]),
    contactPersonId: new FormControl('', [Validators.required]),
    contactPersonEmail: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    passwordPolicy: new FormControl('', [Validators.required]),
  })

  constructor(public route: ActivatedRoute,
    private service: ApiService,
    public util: UtilityService,
    private http: HttpClient,
    public router: Router,) {
  }
  ngOnInit(): void {
    
    this.getPreviousRoute();
  }

  onSubmit() {
    console.log('Form Data:', this.form.value);
  }


  fieldErrors(controller: string) {
    let error = '';


    // Ensure this.form is defined and is an instance of FormGroup
    // if (this.form instanceof FormGroup && this.form.controls[controller]) {
    const control = this.form.get(controller);

    if (control) {
      if (control.hasError('required')) {
        error = this.util.ValidationText('required');
      } else if (control.hasError('email')) {
        error = this.util.ValidationText('email');
      } else if (control.hasError('minlength')) {
        if (controller === 'networkGroupCode') {
          error = 'Minimum length of network group code is 3';
        }
      } else if (control.hasError('maxlength')) {
        if (controller === 'networkGroupName') {
          error = 'Maximum length of network group is 50';
        }
        if (controller === 'networkGroupCode') {
          error = 'Maximum length of network group code is 10';
        }
        if (controller === 'networkGroupDescription') {
          error = 'Maximum length of network group Description is 100';
        }
      } else if (control.hasError('pattern')) {
        if (controller === 'networkGroupName') {
          error = 'Only alphanumeric values and these symbols . - _ ( ) are allowed, with spaces';
        }
        if (controller === 'networkGroupCode') {
          error = 'Only alphanumeric values and these symbols . - _ ( ) are allowed, with spaces';
        }
        if (controller === 'networkGroupDescription') {
          error = 'Only alphanumeric values and these symbols . - _ ( ) are allowed, with spaces';
        }
      } else if (control.hasError('cannotContainLeadingSpace')) {
        error = this.util.ValidationText('cannotContainLeadingSpace');
      } else if (control.hasError('cannotContainTrailingSpace')) {
        error = this.util.ValidationText('cannotContainTrailingSpace');
      }
    }
    return error;
  }

  previousRouteData = '';
  getPreviousRoute() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        pairwise() // Get the current and previous route
      )
      .subscribe(([previous, current]) => {
        const prevSnapshot = this.router.routerState.root.snapshot;

        this.previousRouteData = this.getRouteData(prevSnapshot);
      });
  }
  private getRouteData(snapshot: any): any {
    if (snapshot.firstChild) {
      return this.getRouteData(snapshot.firstChild);
    } else {
      return snapshot.data;
    }
  }
  navigateBreadcrumbs(breadcrumbsData:any) {
    if (breadcrumbsData) {
      this.router.navigate([breadcrumbsData.url], { relativeTo: this.route });
      // this.router.navigateByUrl(breadcrumbsData.url);
    }
  }
}
