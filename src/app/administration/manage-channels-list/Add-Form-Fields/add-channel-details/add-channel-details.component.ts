import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../../../../../services/api.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { UtilityService } from '../../../../../services/utility.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstants } from '../../../../../services/AppConstants';

@Component({
  selector: 'app-add-channel-details',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
  templateUrl: './add-channel-details.component.html',
  styleUrl: './add-channel-details.component.css',
})
export class AddChannelDetailsComponent {
  @Input() shouldShow: any = '';
  @Input() viewChannelId: any;
  @Output() formSubmitted = new EventEmitter<void>();
  channelType: any;
  requestBehaviour = {
    AddNew: 'N',
    Edit: 'E',
    ViewSingle: 'V',
    Approval: 'A',
    Return: 'R',
    MakerCheckerView: 'MCV',
    FileApproval: 'FA',
  };
  behaviour = 'N';
  channelDetails: any = {};
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
    firstName: new FormControl(''),

    channelName: new FormControl('', [
      Validators.required,
      /* Validators.pattern('^(?=.*[A-Za-z0-9])[A-Za-z0-9 ._()-]+$'), */
      Validators.maxLength(50),
    ]),
    channelIndentifier: new FormControl('', [
      Validators.required,
      /* Validators.pattern(/^\d+$/), */
      Validators.maxLength(4),
    ]),
    channelType: new FormControl('', [Validators.required]),
    bin: new FormControl(''),
    endpointType: new FormControl('', [Validators.required]),
    channelFormat: new FormControl('', [Validators.required]),
    isActive: new FormControl(false),
    channelTimeout: new FormControl('', [Validators.required]),
    //  channelIndentifier: new FormControl('',[ Validators.required]),
  });
  Params: any = {
    RoleDetailData: [],
    channelId: 0,
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
    this.route.params.subscribe((param) => {
      console.log(
        'this.route.params ==>',
        this.route.params,
        'param ==>',
        param
      );

      this.Params.channelId = param['id'];
      this.Params.Mode = param['behavior'];

      if (param['behavior'] == 'N') {
        // this.pageTitle = 'Add Institution';
      } else if (param['behavior'] == 'E') {
        // this.pageTitle = 'Edit Institution Details';
        this.getChannelDetailsById(this.Params.channelId);
      } else if (this.shouldShow) {
        //this.pageTitle = 'Edit Institution Details';
        this.getChannelDetailsById(this.viewChannelId);
      }
    });
  }
  onSubmit() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      console.log('API PAYLOAD');
      // this.formSubmitted.emit(); // Notify parent
    }
  }
  onChangeChannelType() {
    this.channelType = this.form.controls.channelType.value;

    if (
      this.channelType == this.appConstants.channelType.bankingChannel.value
    ) {
      this.form.controls.bin.setValidators([
        Validators.required,
        /* Validators.pattern(/^\d+$/), */
        Validators.maxLength(6),
      ]);
    } else {
      this.form.controls.bin.reset();
      this.form.controls.bin.clearValidators();
    }
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
      } else if (control.hasError('maxlength')) {
        if (controller === 'channelName') {
          error = 'Maximum length of channel name is 50';
        }
        if (controller === 'channelIndentifier') {
          error = 'Maximum length of channel indentifier is 4';
        }
        if (controller === 'bin') {
          error = 'Maximum length of bin is 6';
        }
      } else if (control.hasError('pattern')) {
        if (controller === 'channelName') {
          error = 'Only alphanumeric values are allowed';
        }
        if (controller === 'channelIndentifier') {
          error = 'Only numbers are allowed';
        }
        if (controller === 'bin') {
          error = 'Only numbers are allowed';
        }
      } else if (control.hasError('cannotContainLeadingSpace')) {
        error = this.util.ValidationText('cannotContainLeadingSpace');
      } else if (control.hasError('cannotContainTrailingSpace')) {
        error = this.util.ValidationText('cannotContainTrailingSpace');
      }
    }
    return error;
  }

  getChannelDetailsById(channelId: any) {
    this.service.getChannelDetailsById(channelId).subscribe(
      (res) => {
        if (res['ResponseCode'] == '00') {
          console.log('channelId ppp ==>', channelId);
          this.channelDetails = res['Data'];
          this.setValues(res['Data']);

          console.log('this.channelDetails ==>', this.channelDetails);
        }
      },
      (ex: HttpErrorResponse) => {
        this.service
          .refreshToken(ex.status)
          .then(() => this.getChannelDetailsById(channelId));
      }
    );
  }

  setValues(data: any) {
    if (data) {
      this.form.controls.channelName.setValue(data.channelName);
      this.form.controls.channelIndentifier.setValue(data.channelIndentifier);
      this.form.controls.channelType.setValue(data.channelType);
      this.form.controls.bin.setValue(data.bin);
      this.form.controls.endpointType.setValue(data.endpointType);
      this.form.controls.channelFormat.setValue(data.channelFormat);
      this.form.controls.isActive.setValue(data.isActive);
      this.form.controls.channelTimeout.setValue(data.channelTimeout);
    }
  }
}
