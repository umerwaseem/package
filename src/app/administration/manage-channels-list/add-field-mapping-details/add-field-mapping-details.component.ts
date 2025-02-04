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
      internalTag: new FormControl('', [Validators.required]),

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
}

