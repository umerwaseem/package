import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { UtilityService } from '../../../../services/utility.service';

@Component({
  selector: 'app-add-services-details',

  templateUrl: './add-services-details.component.html',
  styleUrl: './add-services-details.component.css'
})
export class AddServicesDetailsComponent {
  channelServiceList: any = [];

  editIndex: number | null = null;
  form = new FormGroup({
    isAutoCreateService: new FormControl(true),
    channelServiceDetails: this.fb.group({
      serviceTypeId: new FormControl(''),
      nodeId: new FormControl(''),

      readQueue: new FormControl(''),
      writeQueue: new FormControl(''),
      serviceFilePath: new FormControl(''),

      listeningIp: new FormControl(''),
      soapDirectory: new FormControl(''),
      soapEnvelop: new FormControl(''),
      logFileName: new FormControl(''),
      isAutoStart: new FormControl(''),
      retryCount: new FormControl(''),


      writeOutboundQueue: new FormControl(''),
      readOutboundQueue: new FormControl(''),
    }),
 
  })
  constructor(public util: UtilityService, private fb: FormBuilder, private service: ApiService,) { }
  ngOnInit(): void {
this.onChangeAutoCreateService()
  }
  onSubmit() {
    if (this.channelServiceList.length === 0) {
      this.util.failureSnackbar('At least one field mapping is required.');
    }

    let obj = this.form.getRawValue()
    console.log('obj', obj)
    obj.channelServiceDetails = this.channelServiceList

    console.log('channelServiceList', this.channelServiceList)
  }


  onChangeAutoCreateService(){
    if(this.form.controls.isAutoCreateService.value ){
      this.channelServiceList = [{ serviceTypeId: 'TCP/IP', node: 'TCP node' }, { serviceTypeId: 'SOAP/REST', node: 'TCP node' }]

     }
    else{
      this.channelServiceList=[]
    }

  }
  addChannelService() {
    if (this.form.get('channelServiceDetails')?.valid) {
      const channelServiceDetails = this.form.get('channelServiceDetails')?.value;

      if (this.editIndex !== null) {
        this.channelServiceList[this.editIndex] = channelServiceDetails;
        this.editIndex = null;
      } else {
        this.channelServiceList.push(channelServiceDetails);
      }

      this.form.get('channelServiceDetails')?.reset();

    }
  }

  editChannelService(index: number) {
    this.editIndex = index;
    this.form.get('channelServiceDetails')?.setValue(this.channelServiceList[index]);
  }

  removeChannelService(index: number) {
    this.channelServiceList.splice(index, 1);
    if (this.editIndex === index) {
      this.editIndex = null;
      this.form.get('channelServiceDetails')?.reset();
    }
  }
}
