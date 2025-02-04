import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { UtilityService } from '../../../../services/utility.service';

@Component({
  selector: 'app-add-message-routing-details',

  templateUrl: './add-message-routing-details.component.html',
  styleUrl: './add-message-routing-details.component.css'
})
export class AddMessageRoutingDetailsComponent {

  messageRoutingList: any[] = [];

  editIndex: number | null = null;
  form = new FormGroup({


    messageRoutingDetails: this.fb.group({

      sequence: new FormControl('', [Validators.required]),

      channelId: new FormControl('', [Validators.required]),
      sourceChannelId: new FormControl('', [Validators.required]),
      destinationChannelId: new FormControl('', [Validators.required]),
      firstIdentifier: new FormControl('', [Validators.required]),
      secondIdentifier: new FormControl('', [Validators.required]),
      thirdIdentifier: new FormControl('', [Validators.required]),
      destinationQueueId: new FormControl('', [Validators.required]),
      destinationAdaptarId: new FormControl('', [Validators.required]),

    }),

  })
  constructor(private util:UtilityService, private fb: FormBuilder, private service: ApiService,) { }
  ngOnInit(): void {

  }
  onSubmit() {
    if (this.messageRoutingList.length == 0) {
      this.util.failureSnackbar('Atleast 1')
    }
   
  }

  addMessageRouting() {
    if (this.form.get('messageRoutingDetails')?.valid) {
      const routingDetails = this.form.get('messageRoutingDetails')?.value;

      if (this.editIndex !== null) {
        // Update the existing entry if in edit mode
        this.messageRoutingList[this.editIndex] = routingDetails;
        this.editIndex = null; // Reset edit mode
      } else {
        // Add new entry
        this.messageRoutingList.push(routingDetails);
      }

      this.form.get('messageRoutingDetails')?.reset(); // Clear form after adding/updating
    }
  }
  editMessageRouting(index: number) {
    this.editIndex = index;
    this.form.get('messageRoutingDetails')?.setValue(this.messageRoutingList[index]);
  }

  removeMessageRouting(index: number) {
    this.messageRoutingList.splice(index, 1);
    if (this.editIndex === index) {
      this.editIndex = null;
      this.form.get('messageRoutingDetails')?.reset();
    }
  }
}
