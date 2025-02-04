import { Component } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-add-channel-details',
providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
  templateUrl: './add-channel-details.component.html',
  styleUrl: './add-channel-details.component.css'
})
export class AddChannelDetailsComponent {

    form = new FormGroup({
      firstName: new FormControl('',),


      urlEnpoint: new FormControl('',[ Validators.required]),
      connectionTimeout: new FormControl('',[ Validators.required]),
      isServer: new FormControl(false,[ Validators.required]),
      isTls: new FormControl(false,[ Validators.required]),
      tlsVersion: new FormControl('',[ Validators.required]),
      endpointType: new FormControl('',[ Validators.required]),
      channelFormat: new FormControl('',[ Validators.required]),
      channelTimeout: new FormControl('',[ Validators.required]),
    //  channelIndentifier: new FormControl('',[ Validators.required]),
    })
 constructor(private service: ApiService,) { }
  ngOnInit(): void {

  }
  onSubmit(){

  }

  onChangeServer() {
    
  }
  onChangeTLS() {
    if (this.form.controls.isTls.value === true ) {

      this.form.controls.tlsVersion.setValidators([ Validators.required]);
    } else {
      this.form.controls.tlsVersion.reset();
      this.form.controls.tlsVersion.clearValidators();
    }

    this.form.updateValueAndValidity();
  }
  tabs = [
    { label: 'Channels', type: 'Channels' },
    { label: 'Channel Endpoints', type: 'Channel Endpoints' },
    { label: 'Channel Queues', type: 'Channel Queues' },

    { label: 'Channel Services' , type: 'Channel Services'},
    { label: 'Message Initialization' , type: 'Message Initialization'},
    
    
    { label: 'Custom Fields' , type: 'Custom Fields'},
    { label: 'Message Field Mapping' , type: 'Message Field Mapping'},
    { label: 'Message Routing' , type: 'Message Routing'},
    { label: 'Message Processing Rules' , type: 'Message Processing Rules'},
    { label: 'Preview Configuration' , type: 'Preview Configuration'},

/*     { label: 'Tags' } */
  ];
}
