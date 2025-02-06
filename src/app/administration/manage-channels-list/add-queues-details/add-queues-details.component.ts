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

  editIndex: number | null = null;
  form = new FormGroup({
    isAutoQueue: new FormControl(true),
    channelQueueDetails: this.fb.group({
      serviceTypeId: new FormControl(''),
      queueName: new FormControl(''),


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
  }


  onChangeAutoQueue() {
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
}
