import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { UtilityService } from '../../../../services/utility.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-add-message-initialization-details',

  templateUrl: './add-message-initialization-details.component.html',
  styleUrl: './add-message-initialization-details.component.css'
})
export class AddMessageInitializationDetailsComponent {
  fieldDefinitionList: any = [{ fieldSequence: 'TCP/IP', fieldName: 'TCP Queue', internalTagName: 'TCP Queue', fieldDescription: 'TCP Queue' },{ fieldSequence: 'TCP/IP', fieldName: 'TCP Queue', internalTagName: 'TCP Queue', fieldDescription: 'TCP Queue' },];
  pagedList: any[] = [];
  page = {
    totalElements: 0,
    size: 5,
    index: 0,
  };
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  messageInitializationList: any = [];

  editMessageIndex: number | null = null;

  messageInitializationForm = new FormGroup({

    messageInitializationDetails: this.fb.group({
      messageName: new FormControl('', [Validators.required,
      Validators.pattern('^(?=.*[A-Za-z0-9])[A-Za-z0-9 ._()-]+$'),
      Validators.maxLength(50),]),
      messageFields: new FormControl([], [Validators.required,
     ]),
     identifierFields: new FormControl([], [Validators.required,
     ]),
     identifierFieldValue: new FormControl('', [Validators.required,
      Validators.pattern('^(?=.*[A-Za-z0-9])[A-Za-z0-9 ._()-]+$'),
      Validators.maxLength(50),]),
      importedFile: new FormControl('',[Validators.required,
      ]),
    }),
  })


  constructor(private util: UtilityService, private fb: FormBuilder, private service: ApiService,) { }
  ngOnInit(): void {
    this.page.totalElements = this.fieldDefinitionList.length; // Set total elements
    this.updatePagedList(); // Initial data load
  }

  ngAfterViewInit() {
    this.page.totalElements = this.fieldDefinitionList.length;
  }
  onSubmit() {

    if (this.messageInitializationList.length === 0) {
      this.util.failureSnackbar('At least one channel queue is required.');
    }

    let obj = this.messageInitializationForm.getRawValue()
    console.log('obj', obj)
    obj.messageInitializationDetails = this.messageInitializationList

    console.log('messageInitializationList', this.messageInitializationList)
   
  }

 

  addMessageInitialization() {
    if (this.messageInitializationForm.invalid) {
      this.messageInitializationForm.markAllAsTouched();
      return;
    }
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
    let control =  this.messageInitializationForm.get(`messageInitializationDetails.${controller}`);

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
  updatePagedList() {
    const startIndex = this.page.index * this.page.size;
    const endIndex = startIndex + this.page.size;
    this.pagedList = this.fieldDefinitionList.slice(startIndex, endIndex);
  }

  handlePageEvent(e: PageEvent) {
    this.page.index = e.pageIndex;
    this.page.size = e.pageSize;
    this.page.totalElements = this.fieldDefinitionList.length; // Ensure total count is updated
    this.updatePagedList();
  }
}

