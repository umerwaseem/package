import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { UtilityService } from '../../../../services/utility.service';

@Component({
  selector: 'app-add-message-initialization-details',

  templateUrl: './add-message-initialization-details.component.html',
  styleUrl: './add-message-initialization-details.component.css'
})
export class AddMessageInitializationDetailsComponent {
  fieldDefinitionList: any = [];
  randomString: any

  editFieldIndex: number | null = null;

  messageInitializationList: any = [];

  editMessageIndex: number | null = null;

  messageInitializationForm = new FormGroup({

    messageInitializationDetails: this.fb.group({
      messageName: new FormControl('', [Validators.required,
      Validators.pattern('^(?=.*[A-Za-z0-9])[A-Za-z0-9 ._()-]+$'),
      Validators.maxLength(50),]),
      tranCode: new FormControl('', [Validators.required,
      Validators.pattern(/^\d+$/),
      Validators.maxLength(4),]),
      messageType: new FormControl('', [Validators.required,
      Validators.pattern('^(?=.*[A-Za-z0-9])[A-Za-z0-9 ._()-]+$'),
      Validators.maxLength(50),]),
      importedFile: new FormControl(''),
    }),
  })


  fieldDefinitionForm = new FormGroup({

    fieldDefinitionDetails: this.fb.group({
      fieldSequence: new FormControl('', [Validators.required,
      Validators.pattern(/^\d+$/),
      Validators.maxLength(3),]),
      fieldName: new FormControl('', [Validators.required,
      Validators.pattern('^(?=.*[A-Za-z0-9])[A-Za-z0-9 ._()-]+$'),
      Validators.maxLength(50),]),
      fieldDescription: new FormControl('', [Validators.required,
      Validators.pattern('^(?=.*[A-Za-z0-9])[A-Za-z0-9 ._()-]+$'),
      Validators.maxLength(100),]),
      internalTagName: new FormControl('', [Validators.required]),
      isRoutingField: new FormControl(''),
      isIdentifier: new FormControl(''),
      isMandatory: new FormControl(''),
      incomingTransformation: new FormControl(''),
      outgoingTransformation: new FormControl(''),
      masking: new FormControl(''),
      customMask: new FormControl(''),
      parentTag: new FormControl(''),
      isRepeatBlock: new FormControl(''),
      minRepeatCount: new FormControl(''),
      maxRepeatCount: new FormControl(''),
      nameSpaceAlias: new FormControl(''),
      lengthType: new FormControl(''),
      fixedLength: new FormControl(''),
      isBitMapped: new FormControl(''),
      isBitMap: new FormControl(''),
      bitmapFieldName: new FormControl(''),
      bitmapBitNumber: new FormControl(''),
      trim: new FormControl(''),
      padding: new FormControl(''),
      paddingValue: new FormControl(''),
      alignment: new FormControl(''),
      metaLengthType: new FormControl(''),
      metaLength: new FormControl(''),
    }),

  })
  constructor(private util: UtilityService, private fb: FormBuilder, private service: ApiService,) { }
  ngOnInit(): void {
    let textArray = [
      'XML',
      'FIXED-LENGTH',

    ];
    this.randomString = Math.floor(Math.random() * textArray.length);
    console.log(' this.randomString', this.randomString);

  }
  onSubmit() {
    if (this.fieldDefinitionList.length === 0) {
      this.util.failureSnackbar('At least one field mapping is required.');
    }

    let obj = this.fieldDefinitionForm.getRawValue()
    console.log('obj', obj)
    obj.fieldDefinitionDetails = this.fieldDefinitionList

    console.log('fieldDefinitionList', this.fieldDefinitionList)
    if (this.messageInitializationForm.valid && this.fieldDefinitionForm.valid) {
      console.log('API PAYLOAD');
      // this.formSubmitted.emit(); // Notify parent
    }
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

  fieldErrors(controller: string) {
    let error = '';


    // Ensure this.form is defined and is an instance of FormGroup
    // if (this.form instanceof FormGroup && this.form.controls[controller]) {
    let control = this.fieldDefinitionForm.get(`fieldDefinitionDetails.${controller}`) || this.messageInitializationForm.get(`messageInitializationDetails.${controller}`);

    if (control) {
      if (control.hasError('required')) {
        error = this.util.ValidationText('required');
      } else if (control.hasError('email')) {
        error = this.util.ValidationText('email');
      } else if (control.hasError('maxlength')) {
        if (controller === 'fieldSequence') {
          error = 'Maximum length of field sequence is 999';
        }
        if (controller === 'fieldName') {
          error = 'Maximum length of field name is 50';
        }
        if (controller === 'messageType') {
          error = 'Maximum length of message type is 50';
        }
        if (controller === 'messageName') {
          error = 'Maximum length of message name is 50';
        }
        if (controller === 'fieldDescription') {
          error = 'Maximum length of field description is 100';
        }
        if (controller === 'tranCode') {
          error = 'Maximum length of tran code is 9999';
        }
        
      } else if (control.hasError('pattern')) {
        if (controller === 'fieldName') {
          error = 'Only alphanumeric values are allowed';
        }
        if (controller === 'fieldDescription') {
          error = 'Only alphanumeric values are allowed';

        }
        if (controller === 'messageType') {
          error = 'Only alphanumeric values are allowed';

        }
        if (controller === 'messageName') {
          error = 'Only alphanumeric values are allowed';

        }
        if (controller === 'tranCode') {
          error = 'Only numbers are allowed';
        }
        if (controller === 'fieldSequence') {
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

