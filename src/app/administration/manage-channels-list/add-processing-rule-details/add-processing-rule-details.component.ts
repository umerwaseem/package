import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { UtilityService } from '../../../../services/utility.service';

@Component({
  selector: 'app-add-processing-rule-details',

  templateUrl: './add-processing-rule-details.component.html',
  styleUrl: './add-processing-rule-details.component.css'
})
export class AddProcessingRuleDetailsComponent {
  ruleProcessingList: any[] = [];
  lstRules: any = [];
  editIndex: number | null = null;

  form = new FormGroup({
    ruleprocessingDetails: this.fb.group({
      routingChannelId: new FormControl('',),


      messageNameId: new FormControl('', [Validators.required]),
      firstIdentifier: new FormControl('', [Validators.required]),
      firstIdentifierValue: new FormControl('', [Validators.required]),

      secondIdentifier: new FormControl(false, [Validators.required]),
      secondIdentifierValue: new FormControl('', [Validators.required]),
      sourceChannelId: new FormControl('', [Validators.required]),
      isSettlementDate: new FormControl('', [Validators.required]),
      isDestinationProcessing: new FormControl('', [Validators.required]),
      isDestinationComms: new FormControl('', [Validators.required]),
      isDestinationSettlement: new FormControl('', [Validators.required]),
      isSourceChannel: new FormControl('', [Validators.required]),
      isDestinationChannel: new FormControl('', [Validators.required]),
      existingRuleId: new FormControl('', [Validators.required]),
      ruleDetails: this.fb.group({
        routingName: new FormControl(''),
        resultZero: new FormControl(''),
        resultOne: new FormControl(''),
        resultTwo: new FormControl(''),
        resultThree: new FormControl(''),
        resultFour: new FormControl(''),
        resultFive: new FormControl(''),
      })
    })
  })
  constructor(private util: UtilityService, private fb: FormBuilder, private service: ApiService,) { }
  ngOnInit(): void {

  }


  onSubmit() {
    if (this.ruleProcessingList.length == 0) {
      this.util.failureSnackbar('Atleast 1')
    }

  }

  addRuleProcessing() {
    if (this.form.get('ruleprocessingDetails')?.valid) {
      const routingDetails = this.form.get('ruleprocessingDetails')?.value;

      if (this.editIndex !== null) {
        // Update the existing entry if in edit mode
        this.ruleProcessingList[this.editIndex] = routingDetails;
        this.editIndex = null; // Reset edit mode
      } else {
        // Add new entry
        this.ruleProcessingList.push(routingDetails);
      }

      this.form.get('ruleprocessingDetails')?.reset(); // Clear form after adding/updating
    }
  }
  editRuleProcessing(index: number) {
    this.editIndex = index;
    //this.form.get('ruleprocessingDetails')?.setValue(this.ruleProcessingList[index]);
  }

  removeRuleProcessing(index: number) {
    this.ruleProcessingList.splice(index, 1);
    if (this.editIndex === index) {
      this.editIndex = null;
      this.form.get('ruleprocessingDetails')?.reset();
    }
  }


  get objRules(): FormGroup {
    return this.form.get('ruleprocessingDetails.ruleDetails') as FormGroup;
  }

  // Remove a header FormGroup from the headers FormArray
  addRules() {
    const rulesForm = this.objRules;

    // Get values from form fields
    const routingName = rulesForm.controls['routingName'].value?.trim();
    const resultZero = rulesForm.controls['resultZero'].value?.trim();
    const resultOne = rulesForm.controls['resultOne'].value?.trim();
    const resultTwo = rulesForm.controls['resultTwo'].value?.trim();
    const resultThree = rulesForm.controls['resultThree'].value?.trim();
    const resultFour = rulesForm.controls['resultFour'].value?.trim();
    const resultFive = rulesForm.controls['resultFive'].value?.trim();

    // Validation: Ensure values are not empty
    if (!routingName || !resultZero || !resultOne || !resultTwo || !resultThree || !resultFour || !resultFive) {
      this.util.failureSnackbar('Header key, value, or sequence cannot be empty.');
      return;
    }

    // Check for duplicates
    /*   const isDuplicate = this.lstRules.some(
        (header: any) =>
          header.headerKey === headerKey &&
          header.headerValue === headerValue &&
          header.headerSequence === headerSequence
      ); 
      
      if (isDuplicate) {
        this.util.failureSnackbar('Duplicate header found!');
        return;
      }
      */
    this.lstRules.push({
      routingName,
      resultZero,
      resultOne,
      resultTwo,
      resultThree,
      resultFour,
      resultFive // Use the actual user input instead of Math.random()
    });

    // Clear form after adding
    rulesForm.reset();
  }
}