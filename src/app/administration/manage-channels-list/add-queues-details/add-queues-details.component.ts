import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { UtilityService } from '../../../../services/utility.service';

@Component({
  selector: 'app-add-queues-details',

  templateUrl: './add-queues-details.component.html',
  styleUrl: './add-queues-details.component.css'
})
export class AddQueuesDetailsComponent {
  channelQueueList: any = [];
  autoQueue:any
  editIndex: number | null = null;
  form = new FormGroup({
    isAutoQueue: new FormControl(true),
    channelQueueDetails: this.fb.group({
      serviceTypeId: new FormControl('',[Validators.required]),
      queueName: new FormControl('',[Validators.required,
        Validators.pattern('^(?=.*[A-Za-z0-9])[A-Za-z0-9 ._()-]+$'),
        Validators.maxLength(50),]),


    }),

  })
  constructor(private util: UtilityService, private fb: FormBuilder, private service: ApiService,) { }
  ngOnInit(): void {
    this.onChangeAutoQueue()
  }
  onSubmit() {
    if (this.channelQueueList.length === 0) {
      this.util.failureSnackbar('At least one field mapping is required.');
    }

    let obj = this.form.getRawValue()
    console.log('obj', obj)
    obj.channelQueueDetails = this.channelQueueList

    console.log('channelQueueList', this.channelQueueList)
    if (this.form.valid) {
      console.log('API PAYLOAD');
     // this.formSubmitted.emit(); // Notify parent
    }
  }


  onChangeAutoQueue() {
    this.autoQueue = this.form.controls.isAutoQueue.value
    if (this.form.controls.isAutoQueue.value) {
      this.channelQueueList = [{ serviceTypeId: 'TCP/IP', node: 1 }, { serviceTypeId: 'SOAP/REST', node: 1 }]
    }
    else {
      this.channelQueueList = []
    }

  }

  addFieldMapping() {
    if (this.form.get('channelQueueDetails')?.valid) {
      const channelQueueDetails = this.form.get('channelQueueDetails')?.value;

      if (this.editIndex !== null) {
        this.channelQueueList[this.editIndex] = channelQueueDetails;
        this.editIndex = null;
      } else {
        this.channelQueueList.push(channelQueueDetails);
      }

      this.form.get('channelQueueDetails')?.reset();

    }
  }

  editFieldMapping(index: number) {
    this.editIndex = index;
    this.form.get('channelQueueDetails')?.setValue(this.channelQueueList[index]);
  }

  removeFieldMapping(index: number) {
    this.channelQueueList.splice(index, 1);
    if (this.editIndex === index) {
      this.editIndex = null;
      this.form.get('channelQueueDetails')?.reset();
    }
  }

  fieldErrors(controller: string) {
    let error = '';


    // Ensure this.form is defined and is an instance of FormGroup
    // if (this.form instanceof FormGroup && this.form.controls[controller]) {
    const control = this.form.get(`channelQueueDetails.${controller}`);

    if (control) {
      if (control.hasError('required')) {
        error = this.util.ValidationText('required');
      } else if (control.hasError('email')) {
        error = this.util.ValidationText('email');
      } else if (control.hasError('maxlength')) {
        if (controller === 'queueName') {
          error = 'Maximum length of queue name is 50';
        }
        if (controller === 'channelIndentifier') {
          error = 'Maximum length of channel indentifier is 4';
        }
        if (controller === 'bin') {
          error = 'Maximum length of bin is 6';
        }
      } else if (control.hasError('pattern')) {
        if (controller === 'queueName') {
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
