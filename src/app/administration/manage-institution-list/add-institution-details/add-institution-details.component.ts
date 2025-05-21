import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UtilityService } from '../../../../services/utility.service';
import { filter, pairwise } from 'rxjs';
import { AppConstants } from '../../../../services/AppConstants';

@Component({
  selector: 'app-add-institution-details',

  templateUrl: './add-institution-details.component.html',
  styleUrl: './add-institution-details.component.css',
})
export class AddInstitutionDetailsComponent implements OnInit {
  @Input() shouldShow: any = '';
  @Input() viewInstitutionId: any;
  requestBehaviour = {
    AddNew: 'N',
    Edit: 'E',
    ViewSingle: 'V',
    Approval: 'A',
    Return: 'R',
    MakerCheckerView: 'MCV',
    FileApproval: 'FA',
  };
  instanceDetails: any = {};

  pageTitle = '';
  behaviour = 'N';
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
    institutionName: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern('^(?=.*[A-Za-z0-9])[A-Za-z0-9 ._()-]+$'),
    ]),
    contactPersonName: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern('^(?=.*[A-Za-z0-9])[A-Za-z0-9 ._()-]+$'),
    ]),

    contactPersonEmail: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
    ]),
    status: new FormControl('', [Validators.required]),
  });

  Params: any = {
    RoleDetailData: [],
    InstitutionId: 0,
    connectorId: 0,
    Mode: 'N',
  };
  constructor(
    private fb: FormBuilder,
    public route: ActivatedRoute,
    private service: ApiService,
    public util: UtilityService,
    private http: HttpClient,
    public router: Router,
    public appConstants: AppConstants
  ) {}
  ngOnInit(): void {
    console.log('this.shouldShow ==>', this.shouldShow);
    this.route.params.subscribe((param) => {
      console.log(
        'this.route.params ==>',
        this.route.params,
        'param ==>',
        param
      );

      this.Params.InstitutionId = param['id'];
      this.Params.Mode = param['behavior'];

      if (param['behavior'] == 'N') {
         this.pageTitle = 'Add Institution';
      } else if (param['behavior'] == 'E') {
         this.pageTitle = 'Edit Institution Details';
        this.getInstitutionDetailsById(this.Params.InstitutionId);
      } else if (this.shouldShow) {
         this.pageTitle = 'Edit Institution Details';
        this.getInstitutionDetailsById(this.viewInstitutionId);
      }
    });

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
        if (controller === 'institutionName') {
          error = 'Maximum length of institution name is 50';
        }
        if (controller === 'contactPersonName') {
          error = 'Maximum length of contact person name is 50';
        }
        if (controller === 'networkGroupDescription') {
          error = 'Maximum length of network group Description is 100';
        }
      } else if (control.hasError('pattern')) {
        if (controller === 'institutionName') {
          error = 'Only alphanumeric values are allowed';
        }
        if (controller === 'contactPersonName') {
          error = 'Only alphanumeric values are allowed';
        }
        if (controller === 'contactPersonEmail') {
          error = 'Invalid Email';
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
  navigateBreadcrumbs(breadcrumbsData: any) {
    if (breadcrumbsData) {
      this.router.navigate([breadcrumbsData.url], { relativeTo: this.route });
      // this.router.navigateByUrl(breadcrumbsData.url);
    }
  }

  getInstitutionDetailsById(intitutionId: any) {
    console.log('intitutionId ==>', intitutionId);

    //this.service.getInstanceDetailsById(intitutionId).subscribe((res: { [x: string]: any; }) => {
    this.service.getInstitutionDetailsById(intitutionId).subscribe(
      (res) => {
        if (res['ResponseCode'] == '00') {
          console.log('intitutionId ppp ==>', intitutionId);
         this.instanceDetails = res['Data'];
          this.setValues(res['Data']);
          /*      this.form.disable() */
        }
      },
      (ex: HttpErrorResponse) => {
        this.service
          .refreshToken(ex.status)
          .then(() => this.getInstitutionDetailsById(intitutionId));
      }
    );
  }

  setValues(data: any) {
    if (data) {
      console.log('data  ==>', data);

      this.form.controls.institutionName.setValue(data.institutionName);
      this.form.controls.contactPersonName.setValue(data.contactPersonName);
      this.form.controls.contactPersonEmail.setValue(data.contactPersonEmail);
      this.form.controls.status.setValue(data.status);
    }
  }
}
