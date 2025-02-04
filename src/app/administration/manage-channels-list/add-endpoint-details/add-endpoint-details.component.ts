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
  lstHeader: Array<{ headerKey: string; headerValue: string; headerSequence: number }> = [];
  form = new FormGroup({
    urlEnpoint: new FormControl('', [Validators.required]),


    connectionTimeout: new FormControl('', [Validators.required]),
    isTls: new FormControl(false),
    tlsVersion: new FormControl(''),
    certPath: new FormControl('', [Validators.required]),
    keyFilePath: new FormControl('', [Validators.required]),
    isClient: new FormControl('',),
    authtype: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
   
    sequence: new FormControl('',),
    whiteListIps: new FormControl([],),

    header: this.fb.group({
 
   
        headerKey: ['', []],
        headerValue: ['', []],
        headerSequence: ['', []],
    
    }),
  })
  constructor(private fb: FormBuilder, private service: ApiService,   public util: UtilityService,) {

  }
  ngOnInit(): void {

  }


  onSubmit() {
    if (this.form.valid) {
      this.formSubmitted.emit(); // Notify parent
    }
  }
  onChangeServer() {

  }
  onChangeClient() {

  }

  onChangeTLS() {
    if (this.form.controls.isTls.value === true) {

      this.form.controls.tlsVersion.setValidators([Validators.required]);
    } else {
      this.form.controls.tlsVersion.reset();
      this.form.controls.tlsVersion.clearValidators();
    }

    this.form.updateValueAndValidity();
  }

  get objHeader(): FormGroup {
    return this.form.get('header') as FormGroup;
  }
  
  // Remove a header FormGroup from the headers FormArray
  addHeader() {
    const headerForm = this.objHeader;
  
    // Get values from form fields
    const headerKey = headerForm.controls['headerKey'].value?.trim();
    const headerValue = headerForm.controls['headerValue'].value?.trim();
    const headerSequence = headerForm.controls['headerSequence'].value?.trim();
  
    // Validation: Ensure values are not empty
    if (!headerKey || !headerValue || !headerSequence) {
      this.util.failureSnackbar('Header key, value, or sequence cannot be empty.');
      return;
    }
  
    // Check for duplicates
    const isDuplicate = this.lstHeader.some(
      (header) =>
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
  
/*   addIp() {
    const newIp = this.newIp; // Assume newIp is bound to an input field
    if (!newIp ) {
      this.util.failureSnackbar('Invalid IP address');
      return;
    }
  
    // Check for duplicates
    if (this.whiteListIps.value.includes(newIp)) {
      this.util.failureSnackbar('IP address already in the whitelist.');
      return;
    }
  
    // Add IP to the array
    this.whiteListIps.setValue([...this.whiteListIps.value, newIp]);
  
    // Clear input after adding
    this.newIp = '';
  }
  
  removeIp(ip: string) {
    // Remove the IP from the array
    this.whiteListIps.setValue(this.whiteListIps.value.filter((item: string) => item !== ip));
  } */
 /*  removeHeader(recId: number) {
    this.lstHeader = this.lstHeader.filter((header) => header.RecId !== recId);
  } */

}

