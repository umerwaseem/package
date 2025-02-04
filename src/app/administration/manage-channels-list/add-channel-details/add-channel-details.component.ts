import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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

  @Output() formSubmitted = new EventEmitter<void>();

  form = new FormGroup({
    firstName: new FormControl('',),


    channelName: new FormControl('',[ Validators.required]),
    channelIndentifier: new FormControl('',[ Validators.required]),
    channelType: new FormControl('',[ Validators.required]),
    bin: new FormControl('',[ Validators.required]),
    endpointType: new FormControl('',[ Validators.required]),
    channelFormat: new FormControl('',[ Validators.required]),
    isActive: new FormControl(false),
    channelTimeout: new FormControl('',[ Validators.required]),
  //  channelIndentifier: new FormControl('',[ Validators.required]),
  })
  constructor(private fb: FormBuilder,private service: ApiService) {
    
  }
  ngOnInit(): void {

  }
  onSubmit() {
    if (this.form.valid) {
      this.formSubmitted.emit(); // Notify parent
    }}
    
}
