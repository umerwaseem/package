import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { UtilityService } from '../../../../services/utility.service';
import { AppConstants } from '../../../../services/AppConstants';
import { VOLUME_DOWN } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-add-custom-field-details',

  templateUrl: './add-custom-field-details.component.html',
  styleUrl: './add-custom-field-details.component.css'
})
export class AddCustomFieldDetailsComponent {
  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  customFieldsList: any = [];
  isCondition: any
  contitionType: any
  editIndex: number | null = null;
  form = new FormGroup({
    customFieldsDetails: this.fb.group({
      channelId: new FormControl('', [Validators.required]),
      messageId: new FormControl('', [Validators.required]),
      isConditional: new FormControl(false),
      directionId: new FormControl('', [Validators.required]),
      fieldTagName: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Za-z0-9])[A-Za-z0-9 ._()-]+$'),
      Validators.maxLength(50),]),
      conditionId: new FormControl(''),



      sourceFieldId: new FormControl(''),
      staticValue: new FormControl(''),
      concat: new FormControl([]),

      startingIndex: new FormControl(''),
      subStringLength: new FormControl(''),
    }),

  })
  constructor(public appConstants: AppConstants, private util: UtilityService, private fb: FormBuilder, private service: ApiService,) { }
  ngOnInit(): void {

  }

  onSubmit() {
    if (this.form.valid) {
      console.log('API PAYLOAD');
      // this.formSubmitted.emit(); // Notify parent
    }
  }



  onChangeIsConditional() {
    this.form.get('customFieldsDetails.conditionId')?.setValue('')
    this.isCondition = this.form.get('customFieldsDetails.isConditional')?.value;

    if (this.isCondition == this.appConstants.channelType.bankingChannel.value) {

      this.form.get('customFieldsDetails.conditionId')?.setValidators([Validators.required]);
    } else {
      this.form.get('customFieldsDetails.conditionId')?.reset();
      this.form.get('customFieldsDetails.conditionId')?.clearValidators();

    }
  }


  onChangeConditionType() {
    const operandType = this.form.get('customFieldsDetails.conditionId')?.value;

    if (
      operandType == this.appConstants.fieldDefinitoionOprandType.append.value
    ) {
      this.form.get('customFieldsDetails.concat')?.setValidators([Validators.required]);
    } else {
      this.form.get('customFieldsDetails.concat')?.clearValidators();
      this.form.get('customFieldsDetails.concat')?.reset();
    }
    if (
      operandType == this.appConstants.fieldDefinitoionOprandType.static.value
    ) {
      this.form.get('customFieldsDetails.staticValue')?.setValidators([Validators.required]);
    } else {
      this.form.get('customFieldsDetails.staticValue')?.clearValidators();
      this.form.get('customFieldsDetails.staticValue')?.reset();
    }
    if (
      operandType == this.appConstants.fieldDefinitoionOprandType.copy.value
    ) {
      this.form.get('customFieldsDetails.sourceFieldId')?.setValidators([Validators.required]);
    } else {
      this.form.get('customFieldsDetails.sourceFieldId')?.clearValidators();
      this.form.get('customFieldsDetails.sourceFieldId')?.reset();
    }
    if (
      operandType ==
      this.appConstants.fieldDefinitoionOprandType.substring.value
    ) {
      this.form.get('customFieldsDetails.sourceFieldId')?.setValidators([Validators.required]);
      this.form.get('customFieldsDetails.subStringLength')?.setValidators([
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.max(2)
      ]);
      this.form.get('customFieldsDetails.startingIndex')?.setValidators([
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.max(2)

      ]);
    } else {
      this.form.get('customFieldsDetails.sourceFieldId')?.clearValidators();
      this.form.get('customFieldsDetails.sourceFieldId')?.reset();
      this.form.get('customFieldsDetails.subStringLength')?.clearValidators();
      this.form.get('customFieldsDetails.subStringLength')?.reset();
      this.form.get('customFieldsDetails.startingIndex')?.clearValidators();
      this.form.get('customFieldsDetails.startingIndex')?.reset();
    }
    this.form.updateValueAndValidity();
  }
  addCustomField() {
    if (this.form.get('customFieldsDetails')?.valid) {
      const customFieldsDetails = this.form.get('customFieldsDetails')?.value;

      if (this.editIndex !== null) {
        this.customFieldsList[this.editIndex] = customFieldsDetails;
        this.editIndex = null;
      } else {
        this.customFieldsList.push(customFieldsDetails);
      }

      this.form.get('customFieldsDetails')?.reset();

    }
  }

  editFieldMapping(index: number) {
    this.editIndex = index;
    this.form.get('customFieldsDetails')?.setValue(this.customFieldsList[index]);
  }

  removeFieldMapping(index: number) {
    this.customFieldsList.splice(index, 1);
    if (this.editIndex === index) {
      this.editIndex = null;
      this.form.get('customFieldsDetails')?.reset();
    }
  }




  fieldErrors(controller: string) {
    let error = '';


    // Ensure this.form is defined and is an instance of FormGroup
    // if (this.form instanceof FormGroup && this.form.controls[controller]) {
    let control = this.form.get(`customFieldsDetails.${controller}`)

    if (control) {
      if (control.hasError('required')) {
        error = this.util.ValidationText('required');
      } else if (control.hasError('email')) {
        error = this.util.ValidationText('email');
      } else if (control.hasError('max')) {
        if (controller === 'startingIndex') {
          error = 'Maximum length of starting index is 99';
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
        if (controller === 'startingIndex') {
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
