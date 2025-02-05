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
  editIndex: number | null = null;

  endpointList: any[] = [];
  @Output() formSubmitted = new EventEmitter<void>();
  lstHeader: any = [];
  lstClient: any = []
  form = new FormGroup({


    endPointDetails: this.fb.group({
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


      header: this.fb.group({


        headerKey: ['', []],
        headerValue: ['', []],
        headerSequence: ['', []],

      }),


      client: this.fb.group({


        whiteListIps: new FormControl([],),


      }),
    }),
  })
  constructor(private fb: FormBuilder, private service: ApiService, public util: UtilityService,) {

  }
  ngOnInit(): void {

  }


  onSubmit() {
    let obj = this.form.getRawValue()
    obj.endPointDetails.header = this.lstHeader;   // Assign lstHeader correctly
    obj.endPointDetails.client = this.lstClient;
    console.log('obj ====>', obj);

    if (this.form.valid) {
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
    const tlsControl = this.form.get('endPointDetails.tlsVersion');
    const isTlsEnabled = this.form.get('endPointDetails.isTls')?.value;

    if (isTlsEnabled) {
      tlsControl?.setValidators([Validators.required]);
    } else {
      tlsControl?.clearValidators();
      tlsControl?.reset();
    }

    tlsControl?.updateValueAndValidity();
  }


  addEndpoint() {
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
    const clientForm = this.objIp;

    const ips = clientForm.controls['whiteListIps'].value?.trim();
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
}

