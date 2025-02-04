import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { UtilityService } from '../../../../services/utility.service';

@Component({
  selector: 'app-add-message-initialization-details',

  templateUrl: './add-message-initialization-details.component.html',
  styleUrl: './add-message-initialization-details.component.css'
})
export class AddMessageInitializationDetailsComponent {
  fieldDefinitionList: any = [];

  editFieldIndex: number | null = null;

  messageInitializationList: any = [];

  editMessageIndex: number | null = null;

  messageInitializationForm = new FormGroup({

    messageInitializationDetails: this.fb.group({
      messageName: new FormControl(''),
      tranCode: new FormControl(''),
      messageType: new FormControl(''),

    }),
  })


  fieldDefinitionForm = new FormGroup({

    fieldDefinitionDetails: this.fb.group({
      fieldSequence: new FormControl(''),
      fieldName: new FormControl(''),
      fieldDescription: new FormControl(''),
      internalTagName: new FormControl(''),
      isRoutingField: new FormControl(''),
      isIdentifier: new FormControl(''),
      isMandatory: new FormControl(''),
    }),

  })
  constructor(private util: UtilityService, private fb: FormBuilder, private service: ApiService,) { }
  ngOnInit(): void {

  }
  onSubmit() {
    if (this.fieldDefinitionList.length === 0) {
      this.util.failureSnackbar('At least one field mapping is required.');
    }

    let obj = this.fieldDefinitionForm.getRawValue()
    console.log('obj', obj)
    obj.fieldDefinitionDetails = this.fieldDefinitionList

    console.log('fieldDefinitionList', this.fieldDefinitionList)
  }

  addFieldDefinition() {
    if (this.fieldDefinitionForm.get('fieldDefinitionDetails')?.valid) {
      const fieldDefinitionDetails = this.fieldDefinitionForm.get('fieldDefinitionDetails')?.value;

      if (this.editFieldIndex !== null) {
        this.fieldDefinitionList[this.editFieldIndex] = fieldDefinitionDetails;
        this.editFieldIndex = null;
      } else {
        this.fieldDefinitionList.push(fieldDefinitionDetails);
      }

      this.fieldDefinitionForm.get('fieldDefinitionDetails')?.reset();

    }
  }

  editFieldDefinition(index: number) {
    this.editFieldIndex = index;
    this.fieldDefinitionForm.get('fieldDefinitionDetails')?.setValue(this.fieldDefinitionList[index]);
  }

  removeFieldDefinition(index: number) {
    this.fieldDefinitionList.splice(index, 1);
    if (this.editFieldIndex === index) {
      this.editFieldIndex = null;
      this.fieldDefinitionForm.get('fieldDefinitionDetails')?.reset();
    }
  }

  addMessageInitialization() {
    if (this.messageInitializationForm.get('messageInitializationDetails')?.valid) {
      const messageInitializationDetails = this.messageInitializationForm.get('messageInitializationDetails')?.value;

      if (this.editMessageIndex !== null) {
        this.messageInitializationList[this.editMessageIndex] = messageInitializationDetails;
        this.editMessageIndex = null;
      } else {
        this.messageInitializationList.push(messageInitializationDetails);
      }

      this.messageInitializationForm.get('messageInitializationDetails')?.reset();

    }
  }
  editMessageInitialization(index: number) {
    this.editMessageIndex = index;
    this.messageInitializationForm.get('messageInitializationDetails')?.setValue(this.messageInitializationList[index]);
  }
  removeMessageInitialization(index: number) {
    this.messageInitializationList.splice(index, 1);
    if (this.editMessageIndex === index) {
      this.editMessageIndex = null;
      this.messageInitializationForm.get('messageInitializationDetails')?.reset();
    }
  }
}

