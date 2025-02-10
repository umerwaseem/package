import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { UtilityService } from '../../../../services/utility.service';

@Component({
  selector: 'app-add-endpoint-details',

  templateUrl: './add-endpoint-details.component.html',
  styleUrl: './add-endpoint-details.component.css'
})
export class AddEndpointDetailsComponent {
  @Output() formSubmitted = new EventEmitter<void>();
  editIndex: number | null = null;
  endpointList: any[] = [];
  lstHeader: any = [];
  lstClient: any = [];
   isTlsEnabled:any
   authType:any

  form = new FormGroup({


    endPointDetails: this.fb.group({
      urlEnpoint: new FormControl('',[
        Validators.required,
        Validators.maxLength(999),
        Validators.pattern(
          '^(https?:\\/\\/)?([a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)+)(:\\d+)?(\\/[\\S]*)?(\\?[\\S]*)?(#[\\S]*)?$'
        ),
      ]),


      connectionTimeout: new FormControl('',[
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.max(2)
      ]),
      isTls: new FormControl(false),
      tlsVersion: new FormControl(''),
      certPath: new FormControl(''),
      keyFilePath: new FormControl(''),
      isClient: new FormControl('',[
        Validators.required,
  
      ]),
      authtype: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),

      sequence: new FormControl('',),


      header: this.fb.group({


        headerKey: ['', []],
        headerValue: ['', []],
        headerSequence: ['', []],

      }),


      client: this.fb.group({


        whiteListIps: ['', []],


      }),
    }),
  })
  constructor(private fb: FormBuilder, private service: ApiService, public util: UtilityService,) {

  }
  ngOnInit(): void {

  }


  onSubmit() {
    if (this.form.valid) {
    
    let obj = this.form.getRawValue()
    obj.endPointDetails.header = this.lstHeader;   // Assign lstHeader correctly
    obj.endPointDetails.client = this.lstClient;
    console.log('obj ====>', obj);

       console.log('API PAYLOAD');
      this.formSubmitted.emit(); // Notify parent
    }
  }
  onChangeServer() {
    this.lstClient = []
    this.lstHeader = []
    this.form.get('endPointDetails.isClient')?.value;
  }
  onChangeClient() {
    this.lstClient = []
    this.lstHeader = []
    this.form.get('endPointDetails.isClient')?.value;
  }

  onChangeTLS() {
   // const tlsControl = this.form.get('endPointDetails.tlsVersion');
    this.isTlsEnabled = this.form.get('endPointDetails.isTls')?.value;

   /*  if (isTlsEnabled) {
      tlsControl?.setValidators([Validators.required]);
    } else {
      tlsControl?.clearValidators();
      tlsControl?.reset();
    }

    tlsControl?.updateValueAndValidity(); */
  }

  onAuthTypeSelection(){
this.authType =this.form.get('endPointDetails.authtype')?.value;
  }
  addEndpoint() {
    
    if (this.lstHeader.length === 0 && this.lstClient.length === 0) {
      return this.util.failureSnackbar('At least one Header or Ip is required.');
    }
    if (this.form.get('endPointDetails')?.valid) {
      const endPointDetails = this.form.get('endPointDetails')?.value;

      if (this.editIndex !== null) {
        // Update the existing entry if in edit mode
        this.endpointList[this.editIndex] = endPointDetails;
        this.editIndex = null; // Reset edit mode
      } else {
        // Add new entry
        this.endpointList.push(endPointDetails);
      }

      this.form.get('endPointDetails')?.reset(); // Clear form after adding/updating
    }
  }
  editMessageRouting(index: number) {
    this.editIndex = index;
    this.form.get('endPointDetails')?.setValue(this.endpointList[index]);
  }

  removeMessageRouting(index: number) {
    this.endpointList.splice(index, 1);
    if (this.editIndex === index) {
      this.editIndex = null;
      this.form.get('endPointDetails')?.reset();
    }
  }
  get objHeader(): FormGroup {
    return this.form.get('endPointDetails.header') as FormGroup;
  }

  // Remove a header FormGroup from the headers FormArray
  addHeader() {
    console.log('this.objHeader', this.objHeader);
    
   
    let headerForm = this.objHeader;
   
    // Get values from form fields
    let headerKey = headerForm.controls['headerKey'].value?.trim();
    let headerValue = headerForm.controls['headerValue'].value?.trim();
    let headerSequence = headerForm.controls['headerSequence'].value?.trim();


      if (!headerKey || !headerValue || !headerSequence) {
        console.log('headerForm.controls ==>', headerForm.controls);
        return this.util.failureSnackbar('At least one Header or IP is required.');
      }
    
    // Check for duplicates
    const isDuplicate = this.lstHeader.some(
      (header: any) =>
        header.headerKey === headerKey &&
        header.headerValue === headerValue &&
        header.headerSequence === headerSequence
    );

    if (isDuplicate) {
      this.util.failureSnackbar('Duplicate header found!');
      return;
    }

    // Add to list
    this.lstHeader.push({
      headerKey,
      headerValue,
      headerSequence, // Use the actual user input instead of Math.random()
    });

    // Clear form after adding
    headerForm.reset();
  }
  get objIp(): FormGroup {
    return this.form.get('endPointDetails.client') as FormGroup;
  }

  addIp() {
    let clientForm = this.objIp;

    let ips = clientForm.controls['whiteListIps'].value?.trim();
    // Trim extra spaces
    if (!ips) {
      this.util.failureSnackbar('Invalid IP address');
      return;
    }
    const isDuplicate = this.lstHeader.some(
      (client: any) =>
        client.whiteListIps === ips

    );

    if (isDuplicate) {
      this.util.failureSnackbar('Duplicate header found!');
      return;
    }

    this.lstClient.push({
      ips,
      // Use the actual user input instead of Math.random()
    });

    // Clear form after adding
    clientForm.reset();
  }


  /* removeIp(ip: string) {
     // Remove the IP from the array
     this.whiteListIps.setValue(this.whiteListIps.value.filter((item: string) => item !== ip));
   } */
  /*  removeHeader(recId: number) {
     this.lstHeader = this.lstHeader.filter((header) => header.RecId !== recId);
   }
*/


fieldErrors(controller: string) {
  let error = '';


  // Ensure this.form is defined and is an instance of FormGroup
  // if (this.form instanceof FormGroup && this.form.controls[controller]) {
  let control = this.form.get(`endPointDetails.${controller}`)

  if (control) {
    if (control.hasError('required')) {
      error = this.util.ValidationText('required');
    } else if (control.hasError('email')) {
      error = this.util.ValidationText('email');
    } else if (control.hasError('max')) {
      if (controller === 'connectionTimeout') {
        error = 'Maximum length of connection timeout is 99';
      }
      if (controller === 'subStringLength') {
        error = 'Maximum length of substring length is 99';

      }
    } else if (control.hasError('maxlength')) {
      if (controller === 'fieldTagName') {
        error = 'Maximum length of field tag name is 50';
      }
      if (controller === 'channelIndentifier') {
        error = 'Maximum length of channel indentifier is 4';
      }
      if (controller === 'bin') {
        error = 'Maximum length of bin is 6';
      }
    } else if (control.hasError('pattern')) {
      if (controller === 'fieldTagName') {
        error = 'Only alphanumeric values are allowed';
      }
      if (controller === 'connectionTimeout') {
        error = 'Only numbers are allowed';
      }
      if (controller === 'subStringLength') {
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

