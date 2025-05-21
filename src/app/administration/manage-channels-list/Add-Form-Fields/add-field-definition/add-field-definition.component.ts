import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ApiService } from '../../../../../services/api.service';
import { UtilityService } from '../../../../../services/utility.service';
import { PageEvent } from '@angular/material/paginator';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstants } from '../../../../../services/AppConstants';

@Component({
  selector: 'app-add-field-definition',

  templateUrl: './add-field-definition.component.html',
  styleUrl: './add-field-definition.component.css',
})
export class AddFieldDefinitionComponent {
  @Input() shouldShow: any = '';
  @Input() viewChannelId: any;
  @Output() formSubmitted = new EventEmitter<void>();
  channelDetails: any = {};


  fieldDefinitionList: any = [];
  randomString: any;
  displayedColumns: string[] = [
    'fieldSequence',
    'fieldName',
    'internalTagName',
    'fieldDescription',
    'actions',
  ];
  displayedColumnsView: string[] = [
    'fieldSequence',
    'fieldName',
    'fieldDescription',
    'internalTagName',
    'isRoutingField',
    'isIdentifier',
    'isMandatory',
    'incomingTransformation',
    'outgoingTransformation',
    'masking',
    'customMask',
    'parentTag',
    'isRepeatBlock',
    'minRepeatCount',
    'maxRepeatCount',
    'nameSpaceAlias',
    'lengthType',
    'fixedLength',
    'isBitMapped',
    'isBitMap',
    'bitmapFieldName',
    'bitmapBitNumber',
    'trim',
    'padding',
    'paddingValue',
    'alignment',
    'metaLengthType',
    'metaLength',
  ];

  editFieldIndex: number | null = null;
  toppingList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];

  fieldDefinitionForm = new FormGroup({
    fieldDefinitionDetails: this.fb.group({
      fieldSequence: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.maxLength(3),
      ]),
      fieldName: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*[A-Za-z0-9])[A-Za-z0-9 ._()-]+$'),
        Validators.maxLength(50),
      ]),
      fieldDescription: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*[A-Za-z0-9])[A-Za-z0-9 ._()-]+$'),
        Validators.maxLength(100),
      ]),
      internalTagName: new FormControl('', [Validators.required]),
      isRoutingField: new FormControl(''),
      isIdentifier: new FormControl(''),
      isMandatory: new FormControl(''),
      incomingTransformation: new FormControl(''),
      outgoingTransformation: new FormControl(''),
      masking: new FormControl(''),
      customMask: new FormControl(''),
      parentTag: new FormControl(''),
      isRepeatBlock: new FormControl(''),
      minRepeatCount: new FormControl(''),
      maxRepeatCount: new FormControl(''),
      nameSpaceAlias: new FormControl(''),
      lengthType: new FormControl(''),
      fixedLength: new FormControl(''),
      isBitMapped: new FormControl(''),
      isBitMap: new FormControl(''),
      bitmapFieldName: new FormControl(''),
      bitmapBitNumber: new FormControl(''),
      trim: new FormControl(''),
      padding: new FormControl(false),
      paddingValue: new FormControl(''),
      alignment: new FormControl(''),
      metaLengthType: new FormControl(''),
      metaLength: new FormControl(''),
    }),
  });

  Params: any = {
    RoleDetailData: [],
    channelId: 0,
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

      this.Params.channelId = param['id'];
      this.Params.Mode = param['behavior'];

      if (param['behavior'] == 'N') {
        // this.pageTitle = 'Add Institution';
      } else if (param['behavior'] == 'E') {
        // this.pageTitle = 'Edit Institution Details';
        this.getChannelEndpointsById(this.Params.channelId);
      } else if (this.shouldShow) {
        //this.pageTitle = 'Edit Institution Details';
        this.getChannelEndpointsById(this.viewChannelId);
      }
    });

    let textArray = ['XML', 'FIXED-LENGTH'];
    this.randomString = Math.floor(Math.random() * textArray.length);
    console.log(' this.randomString', this.randomString);
  }
  onSubmit() {
    if (this.fieldDefinitionList.length === 0) {
      this.util.failureSnackbar('At least one field definition is required.');
    }

    let obj = this.fieldDefinitionForm.getRawValue();
    console.log('obj', obj);
    obj.fieldDefinitionDetails = this.fieldDefinitionList;

    console.log('fieldDefinitionList', this.fieldDefinitionList);
    if (this.fieldDefinitionForm.valid) {
      console.log('API PAYLOAD');
      // this.formSubmitted.emit(); // Notify parent
    }
  }
  onChangePadding() {
    if (
      this.fieldDefinitionForm.get('fieldDefinitionDetails.padding')?.value ===
      true
    ) {
      this.fieldDefinitionForm
        .get('fieldDefinitionDetails.paddingValue')
        ?.setValidators([Validators.required]);
      this.fieldDefinitionForm
        .get('fieldDefinitionDetails.alignment')
        ?.setValidators([Validators.required]);
    } else {
      this.fieldDefinitionForm.get('fieldDefinitionDetails.alignment')?.reset();
      this.fieldDefinitionForm
        .get('fieldDefinitionDetails.alignment')
        ?.clearValidators();
      this.fieldDefinitionForm
        .get('fieldDefinitionDetails.paddingValue')
        ?.reset();
      this.fieldDefinitionForm
        .get('fieldDefinitionDetails.paddingValue')
        ?.clearValidators();
    }

    this.fieldDefinitionForm.updateValueAndValidity();
  }
  onChangeLengthType() {
    if (
      this.fieldDefinitionForm.get('fieldDefinitionDetails.lengthType')?.value
    ) {
      this.fieldDefinitionForm
        .get('fieldDefinitionDetails.padding')
        ?.setValidators([Validators.required]);
      //  this.fieldDefinitionForm.get('fieldDefinitionDetails.alignment')?.setValidators([ Validators.required]);
    } else {
      this.fieldDefinitionForm.get('fieldDefinitionDetails.padding')?.reset();
      this.fieldDefinitionForm
        .get('fieldDefinitionDetails.padding')
        ?.clearValidators();
      /*     this.fieldDefinitionForm.get('fieldDefinitionDetails.padding')?.reset();
          this.fieldDefinitionForm.get('fieldDefinitionDetails.padding')?.clearValidators(); */
    }
    this.fieldDefinitionForm.updateValueAndValidity();
  }
  addFieldDefinition() {
    if (this.fieldDefinitionForm.get('fieldDefinitionDetails')?.valid) {
      const fieldDefinitionDetails = this.fieldDefinitionForm.get(
        'fieldDefinitionDetails'
      )?.value;

      if (this.editFieldIndex !== null) {
        this.fieldDefinitionList[this.editFieldIndex] = fieldDefinitionDetails;
        this.editFieldIndex = null;
      } else {
        this.fieldDefinitionList = [
          ...this.fieldDefinitionList,
          fieldDefinitionDetails,
        ];
      }

      this.fieldDefinitionForm.get('fieldDefinitionDetails')?.reset();
    }
  }

  editFieldDefinition(index: number) {
    this.editFieldIndex = index;
    this.fieldDefinitionForm
      .get('fieldDefinitionDetails')
      ?.setValue(this.fieldDefinitionList[index]);
  }

  removeFieldDefinition(index: number) {
    this.fieldDefinitionList.splice(index, 1);
    if (this.editFieldIndex === index) {
      this.editFieldIndex = null;
      this.fieldDefinitionForm.get('fieldDefinitionDetails')?.reset();
    }
  }

    getChannelEndpointsById(channelId: any) {
      this.service.getChannelEndpointsById(channelId).subscribe(
        (res) => {
          if (res['ResponseCode'] == '00') {
            console.log('channelId ppp ==>', channelId);
            //this.endpointList = [res['Data']];
            //    this.setValues(res['Data']);
            this.fieldDefinitionList = res['Data'];
            console.log('this.channelDetails ==>', this.channelDetails);
          }
        },
        (ex: HttpErrorResponse) => {
          this.service
            .refreshToken(ex.status)
            .then(() => this.getChannelEndpointsById(channelId));
        }
      );
    }

  fieldErrors(controller: string) {
    let error = '';

    // Ensure this.form is defined and is an instance of FormGroup
    // if (this.form instanceof FormGroup && this.form.controls[controller]) {
    let control = this.fieldDefinitionForm.get(
      `fieldDefinitionDetails.${controller}`
    );

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
}
