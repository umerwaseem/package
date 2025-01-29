import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../services/api.service';
import { UtilityService } from '../../../../services/utility.service';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-add-global-configuration',
  encapsulation: ViewEncapsulation.None,
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-global-configuration.component.html',
  styleUrl: './add-global-configuration.component.css'
})
export class AddGlobalConfigurationComponent  implements OnInit{
  isData: any
  step = 0;
  panelOpenState = false;
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

  activeBehaviour: any = {
    addNew: false,
    edit: false,
    approval: false,
    view: false,
    return: false,
    makerCheckerView: false,
    fileApproval: false,
  };


  form= new FormGroup({
    minConnections: new FormControl('', [Validators.required]),
    maxConnections: new FormControl('', [Validators.required]),
    minThreads: new FormControl('', [Validators.required]),
    maxThreads: new FormControl('', [Validators.required]),
    logFileSize: new FormControl('', [Validators.required]),
    logFilePath: new FormControl('', [Validators.required]),
    logLevel: new FormControl('', [Validators.required]),
    configFilePath: new FormControl('', [Validators.required]),
    isTemplate: new FormControl(''),
  })
  duplicateForm = new FormGroup({

    duplicateMinConnections: new FormControl('', [Validators.required]),
    duplicateMaxConnections: new FormControl('', [Validators.required]),
    duplicateMinThreads: new FormControl('', [Validators.required]),
    duplicateMaxThreads: new FormControl('', [Validators.required]),
    duplicateLogFileSize: new FormControl('', [Validators.required]),
    duplicateLogFilePath: new FormControl('', [Validators.required]),
    duplicateLogLevel: new FormControl('', [Validators.required]),
    duplicateConfigFilePath: new FormControl('', [Validators.required]),
  })
 
  constructor(public route: ActivatedRoute,
    private service: ApiService,
    public util: UtilityService,
    private http: HttpClient,
    public router: Router,) {
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.form.get('minConnections')?.valueChanges.subscribe((value) => {
        this.duplicateForm.get('duplicateMinConnections')?.setValue(value);
      });
      this.form.get('maxConnections')?.valueChanges.subscribe((value) => {
        this.duplicateForm.get('duplicateMaxConnections')?.setValue(value);
      });
      this.form.get('minThreads')?.valueChanges.subscribe((value) => {
        this.duplicateForm.get('duplicateMinThreads')?.setValue(value);
      });
      this.form.get('maxThreads')?.valueChanges.subscribe((value) => {
        this.duplicateForm.get('duplicateMaxThreads')?.setValue(value);
      });
      this.form.get('logFileSize')?.valueChanges.subscribe((value) => {
        this.duplicateForm.get('duplicateLogFileSize')?.setValue(value);
      });
      this.form.get('logFilePath')?.valueChanges.subscribe((value) => {
        this.duplicateForm.get('duplicateLogFilePath')?.setValue(value);
      });
      this.form.get('logLevel')?.valueChanges.subscribe((value) => {
        this.duplicateForm.get('duplicateLogLevel')?.setValue(value);
      });
      this.form.get('configFilePath')?.valueChanges.subscribe((value) => {
        this.duplicateForm.get('duplicateConfigFilePath')?.setValue(value);
      });
    }, 0);
    this.duplicateForm.disable()
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  
  }

  prevStep() {
    this.step--;
  }


  submitForm(){
    console.log('this.form..value',this.form.value);
    console.log('this.form..valid',this.form.valid);
    
    if(this.form.valid){
    
    }
  }



  fieldErrors(controller:string) {
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

}

