import { Injectable } from "@angular/core";
import { Subscription, BehaviorSubject, Observable, interval } from "rxjs";
import { Router } from "@angular/router";
import { AbstractControl, ValidationErrors } from "@angular/forms";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
/* import Swal from "sweetalert2"; */
import Swal from 'sweetalert2';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
/* import { BnNgIdleService } from "bn-ng-idle";
import { ApiService } from "./api.service"; */

import { retry } from "rxjs/operators";
/* import * as $ from "jquery"; */
/* import moment from "moment";
import { HttpErrorResponse } from "@angular/common/http";
import { NgxSpinnerService } from "ngx-spinner";umer */ 

import { AppConstants } from './AppConstants'

@Injectable({
  providedIn: "root",
})
export class UtilityService {
  globalCurrency = "";
  isRunProtoType = false;
  entityDataType = ["Varchar", "Number", "Boolean", "Date"];
  dateFormatLabel = "(MM/DD/YYYY)";
  requestBehaviour = {
    AddNew: "N",
    Edit: "E",
    ViewSingle: "V",
    Approval: "A",
    FileApproval: "FA",
    Reverse: "Reverse",
    AddReverseMaker: "ARM",
    Condition: 'C',
    Delete: 'D',
    Tolerance: 'T',
  };
  makerCheckerStatuses = {
    pending: "pending",
    approved: "approved",
    reject: "reject",
    return: "return",
  };
  makerCheckerPerformActions = {
    created: "created",
    modified: "modified",
    deleted: "deleted",
  };
  makerCheckerModuleTypes = {
    customer: "customer",
    blackListCustomer: "blackListCustomer",
  };
  CustomerAccountStatuses = {
    Active: "active",
    Deactivate: "deactive",
    Closed: "closed",
  };
  releaseNoteTypes = {
    improvements: "improvements",
    fixes: "fixes",
    general_instructions_for_user: "general_instructions_for_user",
  };
  userTypesIds = {
    operationUser: 1,
    corporateUser: 2,
  };

  smsStatus = {
    success: 1,
    rejected: 2,
    delievered: 3,
  };
  objSmsStatus = {
    sent: { id: "1", value: "sent" },
    rejected: { id: "2", value: "Rejected" },
    delievered: { id: "3", value: "delievered" },
  };

  loaderCount = 0;
  // private previousUrl: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  // setPreviousUrl(previousUrl: string) {
  //   this.previousUrl.next(previousUrl);
  // }


  menuItems: any = [];


  subscription!: Subscription;
  source: any;
  status!: boolean; //loader status

  ConstantFileUploadTypes = {
    BlacklistCustomer: {
      value: "blacklistCustomer",
      text: "Customer Blacklist",
      url: "bulk-file-upload-blacklist-customer",
    },
    CustomerRegistration: {
      value: "customerRegistration",
      text: "Customer Registration",
      url: "bulk-file-upload-registration-customer",
    },
    SalaryDisbursement: {
      value: "salaryDisbursement",
      text: "Salary Disbursement",
      url: "salary-disbursement",
    },
    ReversalTransactions: {
      value: "BulkReversalTransaction",
      text: "Reversal Transaction",
      url: "bulk-reversal-transactions",
    },
  };
  ConstantUrlQueryParams = {
    Add: "addDialog",
    View: 'viewDialog',
  };

  ddListTypes = {
    gender: "getActiveGender",
    language: "getActiveLanguage",
    customerType: "getActiveCustomerType",
    countries: "getActiveCountry",
    cities: "getActiveCity",
    states: "getActiveState",
    modeInfo: "getModeInfo",
    commisssionFee: "getCommissionFee",
    includeVAT: "getIncludeVAT",
    processByTxn: "getProcessByTxn",
    useCase: "getUseCase",
    feeType: "getFeeType",
    institutionUnitPayee: "getInstitutionUnitPayee",
    payeeFee: "getPayeeFee",
    institutionUnitPayer: "getInstitutionUnitPayer",
    subTxnType: "getSubTxnType",
    piTypePayee: "getPiTypePayee",
    copyFromAuth: "getCopyFromAuth",
    piTypePayer: "getPiTypePayer",
    includeInLimit: "getIncludeInLimit",
    currency: "getCurrency",
    limitClass: "getLimitClass",
    glAccountType: "getGlAccountType",
    customer: "getCustomer",
    limitSet: "getLimitSet",
    feeSet: "getFeeSet",
    useCaseNew: "getuseCaseNew",
    institution: "getInstitution",
    method: "getMethod",
    searchTypeTransfer: "getSearchTypeTransfer",
    debitIdentityType: "getDebitIdentityType",
    creditIdentityType: "getCreditIdentityType",
    revokedRole: "getRevokedRole",
    blacklistReason: "getBlackListReason",
    role: "getRole",
    passwordPolicy: "getPasswordPolicy",
    TransactionTypes: "getTransactionTypes",
  };

  backOfficeTransferType = {
    glToWallet: { value: "1", text: "GL To Wallet" },
    walletToGl: { value: "2", text: "Wallet To GL" },
    walletToWallet: { value: "3", text: "Wallet To Wallet" },
    glToGl: { value: "4", text: "Gl To GL" },
  };

  dynamicFormField = {
    Types: {
      text: "text",
      password: "password",
      email: "email",
      number: "number",
      search: "search",
      tel: "tel",
      ddl: "ddl",
      checkbox: "checkbox",
      textarea: "textarea",
    },
    Validator: {
      required: "required",
      // requiredTrue: "requiredTrue",
      email: "email",
      minLength: "minLength",
      maxLength: "maxLength",
      pattern: "pattern",
      // nullValidator: "nullValidator",
    },
  };

  ddl = {
    in: [
      {
        text: "",
        pass: "",
      },
    ],
  };
  //observable hold user data for header
  subject = new BehaviorSubject<any>(null);
  AppConstant = {
    globalVariableKeys: {
      institutionId: "institutionId"
    },
    fieldDefinitoionOprandType: {
      static: { value: "static", text: "Static" },
      append: { value: "append", text: "Append" },
      substring: { value: "substring", text: "Substring Value" },
      copy: { value: "copy", text: "Copy Value" },
    }
  };
  
 // globalActiveInstitutionId: number = parseInt(localStorage.getItem(this.AppConstant.globalVariableKeys.institutionId));
 globalActiveInstitutionId: number = parseInt(
  localStorage.getItem(this.AppConstant.globalVariableKeys.institutionId) || '0', 
  10
);
  ddlTypes = {
    ddl: "ddl",
    autocomplete: "autocomplete"
  }
  StaticMenuIds = {
    Dashboard: 25,
    AllDashboard: 34,
  };
































































  holdData(data: any) {
    this.subject.next(data);
  }

  //observable hold menu data for user assessment handling
  menuResponse = new BehaviorSubject<any>(null);
  menuDataHandle(data: any) {
    this.menuResponse.next(data);
  }
  // constructor(public router: Router, private snackBar: MatSnackBar,private wsService: WebSocketServiceService,private bnIdle: BnNgIdleService) { }
  // constructor(public router: Router, public service: ApiService, private snackBar: MatSnackBar, private bnIdle: BnNgIdleService) { }
  constructor(
    public router: Router,
    public appConstants: AppConstants,
    private snackBar: MatSnackBar,
    //private spinner: NgxSpinnerService umer
 /*    private bnIdle: BnNgIdleService

 */  ) { }

 
  sweetAlert(message: any) {
    Swal.fire({
      title: 'Validation Error ❌',
      html: message,
      position: 'bottom',
      showClass: {
        popup: `
        animate__animated
        animate__fadeInUp
        animate__faster

      `
      },
      hideClass: {
        popup: `
        animate__animated
        animate__fadeOutDown
        animate__faster
      `
      },
      grow: 'row',
      showConfirmButton: false,
      showCloseButton: true
    })
  }

  sweetAlertForDelete(message: any): Promise<boolean> {
    return Swal.fire({
      title: 'Warning ',
      html: message,
      position: 'center',
      width:'500px',
      showClass: {
        popup: `animate__animated animate__fadeInUp animate__faster`
      },
      hideClass: {
        popup: `animate__animated animate__fadeOutDown animate__faster`
      },
      grow: 'row',
      showConfirmButton: true,                                                                            
      showCancelButton: true,                                                                             
      confirmButtonText: 'Delete',                                                                  
      cancelButtonText: 'Cancel',                                                                   
      icon: 'warning',                                                                                   
      showCloseButton: true,
      confirmButtonColor: '#ff1c1c',                                                                    
      cancelButtonColor: '#00C6C6',
      customClass: {
        confirmButton: 'rounded-buttons',
        cancelButton: 'rounded-buttons',
         title: 'black-title',
         htmlContainer: 'black-text' 
      }
    }).then((result) => {
      return result.isConfirmed;                                                                   
    });
  }
  showValidationErrors(objErrors: any) {
    // let arrErrorsKey = Object.keys(this.objErrors);
    // let arrErrorsValues = Object.values(this.objErrors);
    // // 
    // 
    let errorStr = '<div class="row" style="display: flex; justify-content: center;width:100%; ">';
    errorStr += '<div class="col-md-6 divError">';
    errorStr += '<ol>';

    for (const [key, value] of Object.entries(objErrors)) {
      // 
      // 
      errorStr += "<li style='text-align: left; font-size: 14px'>" + key + " : " + value + "</li>";

    }
    errorStr += '</ol></div></div>';
    // 

    this.sweetAlert(errorStr);
  }
  /*   datePatternYMD(dateValue: string | number | Date) {
      if (this.completeChecker(dateValue)) {
        let date = new Date(dateValue);
        // 
        //   
  
        // 
        let dd = (date.getDate() < 10 ? "0" : "") + date.getDate();
  
        let MM = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
  
        // return (date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate())
  
        return date.getFullYear() + "-" + MM + "-" + dd;
      }
    }
  
    timePatternHMS(dateValue: string | number | Date) {
      if (this.completeChecker(dateValue)) {
        if (dateValue.includes("-")) {
          dateValue = dateValue.replace(/-/g, "/");
        }
        let date = new Date(dateValue);
        return (
          date.getHours() +
          ":" +
          (date.getMinutes() + 1) +
          ":" +
          date.getSeconds()
        );
      }
    } */
  completeChecker(val: string | null | undefined) {
    return val != null && val != undefined && val != "" ? true : false;
  }
  convertStringToNumber(val: any) {
    let res;
    if (this.completeChecker(val)) {
      res = Number(val);
    } else {
      res = null;
    }
    return res;
  }
  dismissSnackBar() {
    this.snackBar.dismiss();
  }
  handleLoader(status: boolean) {
    // this.status = status; // for button disable

   /*  if (status) {
      this.spinner.show();

    }
    else {
      this.spinner.hide();
      setTimeout(() => {
 
        this.spinner.hide();
      }, 1000); umer
    } */

    /*  if (status) {
       this.loaderCount = this.loaderCount + 1;
  
       $("#loader").addClass("loader");
     } else {
       // debugger
       this.loaderCount = this.loaderCount - 1;
       if (this.loaderCount <= 0) {
         $("#loader").removeClass("loader");
       }
     } */
  }
  successSnackbar(message: string) {
    setTimeout(() => {
      this.snackBar.open(message, "close", {
        duration: 2000,
        panelClass: ["success-snackbar"],
      });
    }, 100);
  }
  /*  sweetAlertConfirmBox(
     title = "Are you sure?",
     text = "Your Text",
     callBack = undefined,
     icon: any = "warning",
     showCancelButton = true,
     confirmButtonText: any = true,
     cancelButtonText: any = "Cancel"
   ) {
     Swal.fire({
       title: title,
       text: text,
       icon: icon,
       showCancelButton: showCancelButton,
       confirmButtonText: confirmButtonText,
       cancelButtonText: cancelButtonText,
     }).then((result: any) => {
       if (callBack !== undefined) {
         callBack(result);
       }
       // if (result.isConfirmed) {
       //   // Swal.fire(
       //   //   'Deleted!',
       //   //   'Your imaginary file has been deleted.',
       //   //   'success'
       //   // )
       //   // For more information about handling dismissals please visit
       //   // https://sweetalert2.github.io/#handling-dismissals
       // } else if (result.dismiss === Swal.DismissReason.cancel) {
       //   // Swal.fire(
       //   //   'Cancelled',
       //   //   'Your imaginary file is safe :)',
       //   //   'error'
       //   // )
       //   dismissCallBack()
       // }
     });
   }
  */
  failureSnackbar(
    message: string,
    customDuration = 5000,
    customeVerticalPosition: MatSnackBarVerticalPosition = "bottom"
  ) {
    setTimeout(() => {
      this.snackBar.open(message, "close", {
        duration: customDuration,
        verticalPosition: customeVerticalPosition,
        panelClass: ["error-snackbar"],
      });
    }, 100);
  }

  ValidationText(error: any) {
    let errorText;
    // 

    switch (error) {
      case "required":
        errorText = "Required";
        break;
      case "email":
        errorText = "Enter a valid email";
        break;
      case "pattern":
        errorText = "Enter a valid/number pattern";
        break;
      case "cannotContainLeadingSpace":
        errorText = "Cannot contain leading whitespace";
        break;
      case "cannotContainTrailingSpace":
        errorText = "Cannot contain trailing whitespace";
        break;
      case "minlength":
        errorText = "min length condition not satisfied";
        break;
      case "maxlength":
        errorText = "max length condition not satisfied";
        break;
      default:
        errorText = "";
    }
    return errorText;
  }
  /* GetPageAccess(activeMenuId: any) {
    let RoleAccess = [];
    let Menus = JSON.parse(localStorage.getItem("menu"));
    // 
    // 
    if (Menus != null) {
      let Menu = Menus.filter((x: { menuId: any; }) => x.menuId == activeMenuId);

      // 
      if (Menu.length > 0) {
        RoleAccess = Menu[0].data;
      }
    }
    return RoleAccess;
  } */
    GetPageAccess(activeMenuId: any) {
      let RoleAccess = [];
      const menuData = localStorage.getItem("menu"); // Get the item from localStorage
      const Menus = menuData ? JSON.parse(menuData) : null; // Parse it only if it's not null
    
      if (Menus != null) {
        const Menu = Menus.filter((x: { menuId: any }) => x.menuId == activeMenuId);
    
        if (Menu.length > 0) {
          RoleAccess = Menu[0].data;
        }
      }
    
      return RoleAccess;
    }
    
  manageRoleAccess(menuId: any) {
    let pageAccess:any = {};
    // let pageRoles = this.GetPageAccess(menuId);
    const sessionMenuData = localStorage.getItem("menu");
    let sessionMenus = JSON.parse(sessionMenuData ? sessionMenuData : "[]");
    let pageRoles = sessionMenus.filter((x: { menuId: any; }) => x.menuId == menuId);
    // 

    for (let i = 0; i < pageRoles.length; i++) {
      let key = pageRoles[i].actionName;
      // let obj = {}
      pageAccess[key] = pageRoles[i].allowAccess;
      // pageAccess.push(obj)
    }
    // 

    return pageAccess;
    // if (data.length) {
    //   
    //   role = data.filter(res => res.actionName == accessType)
    //   // debugger
    //   let access = data.filter(res => res.actionName == accessType)
    //   if (access.length) {
    //     role = access[0].allowAccess
    //   }
    // }
    // return role
  }
  _manageRoleAccess(menuId: any) {
    let pageAccess:any = {};
    let pageRoles = this.GetPageAccess(menuId);
    // 

    for (let i = 0; i < pageRoles.length; i++) {
      let key = pageRoles[i].actionName;
      // let obj = {}
      pageAccess[key] = pageRoles[i].allowAccess;
      // pageAccess.push(obj)
    }
    return pageAccess;
    // if (data.length) {
    //   
    //   role = data.filter(res => res.actionName == accessType)
    //   // debugger
    //   let access = data.filter(res => res.actionName == accessType)
    //   if (access.length) {
    //     role = access[0].allowAccess
    //   }
    // }
    // return role
  }
  cannotContainLeadingSpace(control: AbstractControl): ValidationErrors | null {
    // 
    if (control.value) {
      if ((control.value as string)[0] == " ") {
        return { cannotContainLeadingSpace: true };
      }
    }
    return null;
  }
  cannotContainTrailingSpace(
    control: AbstractControl
  ): ValidationErrors | null {
    if (control.value) {
      if ((control.value as string)[control.value.length - 1] == " ") {
        return { cannotContainTrailingSpace: true };
      }
    }
    return null;
  }

  GetUniqueValuesByKey(arr: any[], key: string) {
    return arr.filter(
      (obj: { [x: string]: any; }, index: any, self: any[]) => index === self.findIndex((t: { [x: string]: any; }) => t[key] === obj[key])
    );
  }
  groupBy(xs: any[], key: string | number) {
    return xs.reduce(function (rv: { [key: string]: any[] }, x: { [key: string]: string | number }) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  sortByObjKey(key: string, order = "asc") {
    return function innerSort(a: { [x: string]: any; hasOwnProperty: (arg0: any) => any; }, b: { [x: string]: any; hasOwnProperty: (arg0: any) => any; }) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === "desc" ? comparison * -1 : comparison;
    };
  }
  gropByAndThenSort(array: any[], groupByKey: string | number, sortByKey: string | number, order = "asc") {
    order = order.toLowerCase();
    try {
      // 

      let arrValues: { displayMenu: any; groupByKey: any; sortByKey: any; }[] = [];
      array.forEach((x: { [x: string]: any; menuDisplay: any; }) => {

        // 

        arrValues.push({
          displayMenu: x.menuDisplay,
          groupByKey: x[groupByKey],
          sortByKey: x[sortByKey],
        });
      });
      // Unique Records
      arrValues = this.GetUniqueValuesByKey(arrValues, "groupByKey");
      arrValues = arrValues.sort(this.sortByObjKey("sortByKey"));

      // 


      let returnObject:any = {};
      arrValues.forEach((x: { groupByKey: string; }) => {
        // 

        let lstRecords = array.filter((y: { [x: string]: any; }) => y[groupByKey] == x.groupByKey);
        returnObject[" " + x.groupByKey] = lstRecords;
      });
      

      return returnObject;
    } catch (e) {
      throw e;
    }
  }
  validateEmail(email: any) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  validateTag(tag: any) {
    const re = /\[.*?\]/;
    return re.test(String(tag).toLowerCase());
  }
 /*  formatedDate(date: any, format = "dddd, Do MMMM YYYY, h:mm:ss a") {
    return moment(String(date)).format(format).toString();
  } */
  downloadCsvFile(filename: string, text: string | number | boolean) {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
  downloadFile(fileUrl: string) {
    var element = document.createElement("a");
    element.setAttribute("href", fileUrl);
    element.setAttribute("download", "true");
    element.setAttribute("_target", "true");

    

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  compareObjectsForArraySort(object1: { [x: string]: any; }, object2: { [x: string]: any; }, key: string | number) {
    // const obj1 = object1[key].toUpperCase()
    // const obj2 = object2[key].toUpperCase()

    const obj1 = object1[key];
    const obj2 = object2[key];

    if (obj1 < obj2) {
      return -1;
    }
    if (obj1 > obj2) {
      return 1;
    }
    return 0;
  }

  createDropdownList(
    Data = [],
    textKey = "",
    valueKey = "",
    att1Key = "",
    att2Key = ""
  ) {
    let genericDdl = [];
    for (let i = 0; i < Data.length; i++) {
      const element = Data[i];
      let ddlObj = {
        text: textKey ? element[textKey] : "",
        value: valueKey ? element[valueKey] : "",
        att1: att1Key ? element[att1Key] : "",
        att2: att2Key ? element[att2Key] : "",
      };
      genericDdl.push(ddlObj);
    }
    return genericDdl;
  }

  institutionDropDownData = [
    {
      value: 7,
      strValue: null,
      text: "Habib Bank Limited",
      attr1: null,
      attr2: null,
    },
    {
      value: 6,
      strValue: null,
      text: "Meezan Bank Limited",
      attr1: null,
      attr2: null,
    },
    {
      value: 5,
      strValue: null,
      text: "Bank Alfalah",
      attr1: null,
      attr2: null,
    },
    {
      value: 4,
      strValue: null,
      text: "Standard Chartered",
      attr1: null,
      attr2: null,
    },
  ];

  AccountSearchType = [
    {
      value: 1,
      strValue: null,
      text: "Customer Id",
      attr1: null,
      attr2: null,
    },
    {
      value: 1,
      strValue: null,
      text: "account no",
      attr1: null,
      attr2: null,
    },
  ];

  isLoggedInUserIsAdmin() {
    let response = { status: false, institutionId: 0 };
    let institution: any = localStorage.getItem("institutionId");

    if (institution == 0 || institution == null) {
      response.status = true;
      response.institutionId = 0;
    } else {
      response.status = false;
      response.institutionId = institution;
    }
    // 

    return response;
  }
  setSessionExpireTimeInLocalStorage(seconds = 1199) {
    
    //                              1199   *  1000 = 1,199,000
    let expireSessionMiliSeconds = seconds * 1000;
    

    // set time 1 min less from session time
    expireSessionMiliSeconds -= 60 * 1000;

    // expireSessionMiliSeconds = expireSessionMiliSeconds / 60;

    

    let expireSessionTime = new Date(
      new Date().getTime() + expireSessionMiliSeconds
    );
    localStorage.setItem("expireSessionTime", expireSessionTime.toString());

    // 
    // 
  }

  deleteQueryParam(route = "/file-upload-management/bulk-file-upload-approvals") {
    this.router.navigate([route]);
  }
  deleteReversalTransactionQueryParam(isApproval: any) {
    if (!isApproval) {
      this.router.navigate(["/reversal-transactions/bulk-reversal-transactions"]);
    } else {
      this.router.navigate(["/file-upload-management/bulk-file-upload-approvals"]);
    }
  }
  getCusrrencyByInstitutionId(institutionLst: any[], id: any) {
    let filteredCurrencyByInstituionId = institutionLst.filter(
      (x) => x.value == id
    );
    this.globalCurrency = filteredCurrencyByInstituionId[0].attr2.toUpperCase();
  }

  // getDropDownData(dropdownType: String): String[] {
  //   let ddlArray = [];
  //   this.apiService.getDropdown(dropdownType).subscribe((res) => {
  //     if (res['ResponseCode'] === '00') {
  //       ddlArray = res['Data'];
  //     }
  //   }, (ex: HttpErrorResponse) => {
  //     this.apiService.refreshToken(ex.status).then(
  //       () => this.getDropDownData(dropdownType)
  //     )
  //   });
  //     return ddlArray;
  // }

  ConstantQueryParamsValues = {
    view: "view",
    reverse: "reverse",
    approval: "approval",
  };
  datePatternYMD(dateValue:any) {
    if (this.completeChecker(dateValue)) {
      let date = new Date(dateValue);
      // 
      //   

      // 
      let dd = (date.getDate() < 10 ? "0" : "") + date.getDate();

      let MM = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);

      // return (date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate())

      return date.getFullYear() + "-" + MM + "-" + dd;
    }
    return undefined; 
  }
  localDateTimePatternYMD_hms(dateValue:any) {
    if (this.completeChecker(dateValue)) {
      const dateTime = dateValue;
      const formattedDateTime = new Date(dateTime).toLocaleString('sv-SE').replace("T", " ").split(".")[0];
      return formattedDateTime;
      // 
    }
    return undefined; 
  }
  createConstantFieldOprandTypeDDL() {
    let ddlArr:any = [];
    this.appConstants
    Object.entries(this.appConstants.fieldDefinitoionOprandType).forEach(oprandType => {
      ddlArr.push(oprandType[1]);
    });
    return ddlArr;
  }
  createConstantFieldDataTypes() {
    let ddlArr:any = [];
    this.appConstants
    Object.entries(this.appConstants.fieldDefinition.constantDataTypes).forEach(dataType => {
      ddlArr.push(dataType[1]);
    });
    return ddlArr;
  }
  createConstantFieldConditions() {
    let ddlArr:any = [];
    this.appConstants
    Object.entries(this.appConstants.fieldDefinition.constantConditions).forEach(condition => {
      ddlArr.push(condition[1]);
    });
    return ddlArr;
  }
  createConstantTargetFieldTypes() {
    let ddlArr:any = [];
    this.appConstants
    Object.entries(this.appConstants.fieldDefinition.constantTargetFieldTypes).forEach(type => {
      ddlArr.push(type[1]);
    });
    return ddlArr;
  }
  createConstantLogicalOperator() {
    let ddlArr:any = [];
    this.appConstants
    Object.entries(this.appConstants.logicalOperator).forEach(type => {
      ddlArr.push(type[1]);
    });
    return ddlArr;
  }
  createDDLByConstantsObjects(obj = {}) {
    let ddlArr:any = [];
    Object.entries(obj).forEach(type => {
      ddlArr.push(type[1]);
    });
    return ddlArr;
  }


}
