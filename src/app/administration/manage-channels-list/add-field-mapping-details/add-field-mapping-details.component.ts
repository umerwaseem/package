import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { UtilityService } from '../../../../services/utility.service';

@Component({
  selector: 'app-add-field-mapping-details',
  
  templateUrl: './add-field-mapping-details.component.html',
  styleUrl: './add-field-mapping-details.component.css'
})
export class AddFieldMappingDetailsComponent {

  fieldMappingList: any[] = [];

  editIndex: number | null = null;
  form = new FormGroup({


    fieldMappingDetails: this.fb.group({

      sourceChannelId: new FormControl('', [Validators.required]),

      sourceMessageId: new FormControl('', [Validators.required]),
      sourceFieldId: new FormControl('', [Validators.required]),
      destinationChannelId: new FormControl('', [Validators.required]),
      destinationMessageId: new FormControl('', [Validators.required]),
      destinationFieldId: new FormControl('', [Validators.required]),
      internalTag: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Za-z0-9])[A-Za-z0-9 ._()-]+$'),
        Validators.maxLength(50),]),

    }),

  })
  constructor(private util:UtilityService, private fb: FormBuilder, private service: ApiService,) { }
  ngOnInit(): void {

  }
  onSubmit() {
    if (this.fieldMappingList.length === 0) {
      this.util.failureSnackbar('At least one field mapping is required.');
    }
  }

  addFieldMapping() {
    if (this.form.get('fieldMappingDetails')?.valid) {
      const fieldMappingDetails = this.form.get('fieldMappingDetails')?.value;

      if (this.editIndex !== null) {
        this.fieldMappingList[this.editIndex] = fieldMappingDetails;
        this.editIndex = null;
      } else {
        this.fieldMappingList.push(fieldMappingDetails);
      }

      this.form.get('fieldMappingDetails')?.reset();
    }
  }

  editFieldMapping(index: number) {
    this.editIndex = index;
    this.form.get('fieldMappingDetails')?.setValue(this.fieldMappingList[index]);
  }

  removeFieldMapping(index: number) {
    this.fieldMappingList.splice(index, 1);
    if (this.editIndex === index) {
      this.editIndex = null;
      this.form.get('fieldMappingDetails')?.reset();
    }
  }

  fieldErrors(controller: string) {
    let error = '';


    // Ensure this.form is defined and is an instance of FormGroup
    // if (this.form instanceof FormGroup && this.form.controls[controller]) {
      let control = this.form.get(`fieldMappingDetails.${controller}`)

    if (control) {
      if (control.hasError('required')) {
        error = this.util.ValidationText('required');
      } else if (control.hasError('email')) {
        error = this.util.ValidationText('email');
      } else if (control.hasError('maxlength')) {
        if (controller === 'internalTag') {
          error = 'Maximum length of internal tag name is 50';
        }
        if (controller === 'channelIndentifier') {
          error = 'Maximum length of channel indentifier is 4';
        }
        if (controller === 'bin') {
          error = 'Maximum length of bin is 6';
        }
      } else if (control.hasError('pattern')) {
        if (controller === 'internalTag') {
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

