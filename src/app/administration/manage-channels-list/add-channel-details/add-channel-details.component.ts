import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { UtilityService } from '../../../../services/utility.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstants } from '../../../../services/AppConstants';


@Component({
  selector: 'app-add-channel-details',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
  templateUrl: './add-channel-details.component.html',
  styleUrl: './add-channel-details.component.css'
})
export class AddChannelDetailsComponent {

  @Output() formSubmitted = new EventEmitter<void>();
  channelType: any
  form = new FormGroup({
    firstName: new FormControl('',),


    channelName: new FormControl('', [Validators.required,
    Validators.pattern('^(?=.*[A-Za-z0-9])[A-Za-z0-9 ._()-]+$'),
    Validators.maxLength(50),]),
    channelIndentifier: new FormControl('', [Validators.required,
    Validators.pattern(/^\d+$/),
    Validators.maxLength(4),]),
    channelType: new FormControl('', [Validators.required]),
    bin: new FormControl(''),
    endpointType: new FormControl('', [Validators.required]),
    channelFormat: new FormControl('', [Validators.required]),
    isActive: new FormControl(false,),
    channelTimeout: new FormControl('', [Validators.required]),
    //  channelIndentifier: new FormControl('',[ Validators.required]),
  })
  constructor(private fb: FormBuilder, public route: ActivatedRoute,
    private service: ApiService,
    public util: UtilityService,
    private http: HttpClient,
    public router: Router,
    public appConstants: AppConstants,) {

  }
  ngOnInit(): void {

  }
  onSubmit() {

    if (this.form.valid) {
      console.log('API PAYLOAD');
     // this.formSubmitted.emit(); // Notify parent
    }
  }
  onChangeChannelType() {
    this.channelType = this.form.controls.channelType.value;

    if (this.channelType == this.appConstants.channelType.bankingChannel.value) {

      this.form.controls.bin.setValidators([Validators.required,
      Validators.pattern(/^\d+$/),
      Validators.maxLength(6),]);
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
        if (controller === 'channelIndentifier' ) {
          error = 'Only numbers are allowed';
        }
        if (controller === 'bin' ) {
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
}
