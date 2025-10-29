import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ApiService } from '../../../../../services/api.service';
import { UtilityService } from '../../../../../services/utility.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstants } from '../../../../../services/AppConstants';

@Component({
  selector: 'app-add-field-mapping-details',

  templateUrl: './add-field-mapping-details.component.html',
  styleUrl: './add-field-mapping-details.component.css',
})
export class AddFieldMappingDetailsComponent {
  @Input() shouldShow: any = '';
  @Input() viewMappingId: any;
  @Output() formSubmitted = new EventEmitter<void>();
  pageTitle: any;
  fieldMappingList: any[] = [];
  displayedColumns: string[] = [
    'sourceChannelId',
    'sourceMessageId',
    'sourceFieldId',
    'destinationChannelId',
    'destinationMessageId',
    'destinationFieldId',
    'internalTag',

    'actions',
  ];
  displayedColumnsView: string[] = [
    'sourceChannelId',
    'sourceMessageId',
    'sourceFieldId',
    'destinationChannelId',
    'destinationMessageId',
    'destinationFieldId',
    'internalTag',
  ];
  editIndex: number | null = null;
  form = new FormGroup({
    fieldMappingDetails: this.fb.group({
      sourceChannelId: new FormControl('', [Validators.required]),

      sourceMessageId: new FormControl('', [Validators.required]),
      sourceFieldId: new FormControl('', [Validators.required]),
      destinationChannelId: new FormControl('', [Validators.required]),
      destinationMessageId: new FormControl('', [Validators.required]),
      destinationFieldId: new FormControl('', [Validators.required]),
      internalTag: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*[A-Za-z0-9])[A-Za-z0-9 ._()-]+$'),
        Validators.maxLength(50),
      ]),
    }),
  });
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
        this.pageTitle = 'Add Field Mapping';
      } else if (param['behavior'] == 'E') {
        this.pageTitle = 'Edit Field Mapping Details';
        this.getFieldMappingDetailsById(this.Params.mappingId);
      } else if (this.shouldShow) {
        this.pageTitle = 'Edit Field Mapping Details';
        this.getFieldMappingDetailsById(this.viewMappingId);
      }
    });
  }
  onSubmit() {
    if (this.fieldMappingList.length === 0) {
      this.util.failureSnackbar('At least one field mapping is required.');
    }
  }

  addFieldMapping() {
    if (this.form.get('fieldMappingDetails')?.valid) {
      const fieldMappingDetails = this.form.get('fieldMappingDetails')?.value;

      if (this.editIndex !== null) {
        this.fieldMappingList[this.editIndex] = fieldMappingDetails;
        this.editIndex = null;
      } else {
        this.fieldMappingList = [...this.fieldMappingList, fieldMappingDetails];
      }

      this.form.get('fieldMappingDetails')?.reset();
    }
  }

  editFieldMapping(index: number) {
    this.editIndex = index;
    this.form
      .get('fieldMappingDetails')
      ?.setValue(this.fieldMappingList[index]);
  }

  removeFieldMapping(index: number) {
    this.fieldMappingList.splice(index, 1);
    if (this.editIndex === index) {
      this.editIndex = null;
      this.form.get('fieldMappingDetails')?.reset();
    }
  }
  getFieldMappingDetailsById(mappingId: any) {
    this.service.getFieldMappingDetailsById(mappingId).subscribe(
      (res) => {
        if (res['ResponseCode'] == '00') {
          console.log('mappingId ppp ==>', mappingId);
          //this.endpointList = [res['Data']];
          //    this.setValues(res['Data']);
          this.fieldMappingList = res['Data'];
        }
      },
      (ex: HttpErrorResponse) => {
        this.service
          .refreshToken(ex.status)
          .then(() => this.getFieldMappingDetailsById(mappingId));
      }
    );
  }
  fieldErrors(controller: string) {
    let error = '';

    // Ensure this.form is defined and is an instance of FormGroup
    // if (this.form instanceof FormGroup && this.form.controls[controller]) {
    let control = this.form.get(`fieldMappingDetails.${controller}`);

    if (control) {
      if (control.hasError('required')) {
        error = this.util.ValidationText('required');
      } else if (control.hasError('email')) {
        error = this.util.ValidationText('email');
      } else if (control.hasError('maxlength')) {
        if (controller === 'internalTag') {
          error = 'Maximum length of internal tag name is 50';
        }
        if (controller === 'channelIndentifier') {
          error = 'Maximum length of channel indentifier is 4';
        }
        if (controller === 'bin') {
          error = 'Maximum length of bin is 6';
        }
      } else if (control.hasError('pattern')) {
        if (controller === 'internalTag') {
          error = 'Only alphanumeric values are allowed';
        }
        if (controller === 'channelIndentifier') {
          error = 'Only numbers are allowed';
        }
        if (controller === 'bin') {
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
