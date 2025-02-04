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
  constructor(private util: UtilityService, private fb: FormBuilder, private service: ApiService,) { }
  ngOnInit(): void {

  }
  onSubmit() {
    if (this.fieldMappingList.length == 0) {
      this.util.failureSnackbar('Atleast 1')
    }

  }

  addMessageRouting() {
    if (this.form.get('messageRoutingDetails')?.valid) {
      const routingDetails = this.form.get('messageRoutingDetails')?.value;

      if (this.editIndex !== null) {
        // Update the existing entry if in edit mode
        this.fieldMappingList[this.editIndex] = routingDetails;
        this.editIndex = null; // Reset edit mode
      } else {
        // Add new entry
        this.fieldMappingList.push(routingDetails);
      }

      this.form.get('messageRoutingDetails')?.reset(); // Clear form after adding/updating
    }
  }
  editMessageRouting(index: number) {
    this.editIndex = index;
    // this.form.get('messageRoutingDetails')?.setValue(this.fieldMappingList[index]);
  }

  removeMessageRouting(index: number) {
    this.fieldMappingList.splice(index, 1);
    if (this.editIndex === index) {
      this.editIndex = null;
      this.form.get('messageRoutingDetails')?.reset();
    }
  }
}

