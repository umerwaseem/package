import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { UtilityService } from '../../../../services/utility.service';

@Component({
  selector: 'app-add-custom-field-details',

  templateUrl: './add-custom-field-details.component.html',
  styleUrl: './add-custom-field-details.component.css'
})
export class AddCustomFieldDetailsComponent {
  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  customFieldsList: any = [];

  editIndex: number | null = null;
  form = new FormGroup({
    customFieldsDetails: this.fb.group({
      channelId: new FormControl(''),
      messageId: new FormControl(''),
      isConditional: new FormControl(false),
      directionId: new FormControl(''),
      fieldTagName: new FormControl(''),
      conditionId: new FormControl(''),



      sourceFieldId: new FormControl(''),

      concat: new FormControl(''),

      startingIndex: new FormControl(''),
      length: new FormControl(''),
    }),

  })
  constructor(private util: UtilityService, private fb: FormBuilder, private service: ApiService,) { }
  ngOnInit(): void {

  }

  onSubmit() { }



  onchangeCondition(){
    this.form.get('customFieldsDetails.conditionId')?.setValue('')
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
}
