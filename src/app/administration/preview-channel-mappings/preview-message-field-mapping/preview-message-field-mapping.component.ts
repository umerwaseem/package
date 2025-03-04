import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { UtilityService } from '../../../../services/utility.service';

@Component({
  selector: 'app-preview-message-field-mapping',
  templateUrl: './preview-message-field-mapping.component.html',
  styleUrl: './preview-message-field-mapping.component.css'
})
export class PreviewMessageFieldMappingComponent {
  form = new FormGroup({


   

      sourceChannelId: new FormControl('', [Validators.required]),

      sourceMessageId: new FormControl('', [Validators.required]),
      sourceFieldId: new FormControl('', [Validators.required]),
      destinationChannelId: new FormControl('', [Validators.required]),
      destinationMessageId: new FormControl('', [Validators.required]),
      destinationFieldId: new FormControl('', [Validators.required]),
      internalTag: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Za-z0-9])[A-Za-z0-9 ._()-]+$'),
      Validators.maxLength(50),]),



  })
  constructor(private util: UtilityService, private fb: FormBuilder, private service: ApiService,) { }
  ngOnInit(): void {

  }
}
