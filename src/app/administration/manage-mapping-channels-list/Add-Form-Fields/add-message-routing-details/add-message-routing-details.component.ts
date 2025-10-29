import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../../../../../services/api.service';
import { UtilityService } from '../../../../../services/utility.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstants } from '../../../../../services/AppConstants';

@Component({
  selector: 'app-add-message-routing-details',

  templateUrl: './add-message-routing-details.component.html',
  styleUrl: './add-message-routing-details.component.css'
})
export class AddMessageRoutingDetailsComponent {
 @Input() shouldShow: any = '';
  @Input() viewMappingId: any;
  @Output() formSubmitted = new EventEmitter<void>();
  pageTitle:any
  messageRoutingList: any = [];

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
 Params: any = {
     RoleDetailData: [],
     mappingId: 0,
     connectorId: 0,
     Mode: 'N',
   };
    constructor(
      private fb: FormBuilder,
      public route: ActivatedRoute,
      private service: ApiService,
      public util: UtilityService,
      private http: HttpClient,
      public router: Router,
      public appConstants: AppConstants
    ) {}
     ngOnInit(): void {
     this.route.params.subscribe((param) => {
       console.log(
         'this.route.params ==>',
         this.route.params,
         'param ==>',
         param
       );
 
       this.Params.mappingId = param['id'];
       this.Params.Mode = param['behavior'];
 
       if (param['behavior'] == 'N') {
          this.pageTitle = 'Add Message Routing';
       } else if (param['behavior'] == 'E') {
          this.pageTitle = 'Edit Message Routing Details';
         this.getMessageRoutingDetailsById(this.Params.mappingId);
       } else if (this.shouldShow) {
         this.pageTitle = 'Edit Message Routing Details';
         this.getMessageRoutingDetailsById(this.viewMappingId);
       }
     });
   }
  onSubmit() {
    if (this.messageRoutingList.length == 0) {
      this.util.failureSnackbar('Atleast 1 message routing is required.')
    }
    let obj=this.form.getRawValue()
    obj.messageRoutingDetails = this.messageRoutingList


    console.log('obj ==>', obj);
    
  }

  addMessageRouting() {
    if (this.form.get('messageRoutingDetails')?.valid) {
      const routingDetails = this.form.get('messageRoutingDetails')?.value;
      console.log('routingDetails', routingDetails);
      
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

  getMessageRoutingDetailsById(mappingId: any) {
      this.service.getMessageRoutingDetailsById(mappingId).subscribe(
        (res) => {
          if (res['ResponseCode'] == '00') {
            console.log('mappingId ppp ==>', mappingId);
            //this.endpointList = [res['Data']];
            //    this.setValues(res['Data']);
            this.messageRoutingList = res['Data'];
          }
        },
        (ex: HttpErrorResponse) => {
          this.service
            .refreshToken(ex.status)
            .then(() => this.getMessageRoutingDetailsById(mappingId));
        }
      );
    }
}
