import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { Router, ActivatedRoute } from "@angular/router";
import { UtilityService } from "./utility.service";
import { EditActionDataService } from "./edit-action-data.service";
import { Observable, ObservableInput, of, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import * as UserList from "../jsonData/Users.json";
import * as InstitutionList from "../jsonData/institution.json";
import * as RoleDetail from "../jsonData/roleDetails.json";
import * as MenuList from "../jsonData/menuList.json";
import { CustomerRegistrationDropDown } from "./drop-down";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // This ensures that the service is provided at the root level
})
export class ApiService {

  // ------------ for local ---------------------
  environmentUrl = "http://localhost:3001/";



  // ------------ for server ---------------------
  // environmentUrl = "/reconx/";
  // environmentUrl = "/";

  refreshTokenError = 0;
  constructor(
    private dialog: MatDialog,
    public http: HttpClient,
    public editData: EditActionDataService,
    public customerDropdown: CustomerRegistrationDropDown,
    public util: UtilityService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  headers = {
    headers: new HttpHeaders({
      //"Content-Type": "application/x-www-form-urlencoded",
      "Content-Type": "application/json",
      // 'Access-Control-Allow-Origin': '*',
      /*     Authorization:
            "Basic " + btoa("IWallet:1807be52-70ae-45ff-a7e2-b23b3b3dfb33"), */
    }),
  };

  data = {
    refresh_token: localStorage.getItem("refresh_token"),
  }

  headerForRefreshToken = {
    headers: new HttpHeaders({
      //"Content-Type": "application/x-www-form-urlencoded",
      'Content-Type': 'application/x-www-form-urlencoded'
      // 'Access-Control-Allow-Origin': '*',
      /*     Authorization:
            "Basic " + btoa("IWallet:1807be52-70ae-45ff-a7e2-b23b3b3dfb33"), */
    }),
  };

  restHeader() {
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("access_token"),
        userId: localStorage.getItem("userId") || '',
        roleId: localStorage.getItem("roleId") || '',
        institutionId: localStorage.getItem("institutionId") || '',
        email: localStorage.getItem("email") || '',
        firstName: localStorage.getItem("firstName") || '',
        username: localStorage.getItem("firstName") || '',
        roleName: localStorage.getItem("roleName") || '',
        Accept: "*",
      }),
    };
  }


  restMultipartHeader() {
    return {
      headers: new HttpHeaders({
        // 'Content-Type': 'multipart/form-data',
        Authorization: "bearer " + localStorage.getItem("access_token"),
        userId: localStorage.getItem("userId") || '',
        roleId: localStorage.getItem("roleId") || '',
        institutionId: localStorage.getItem("institutionId") || '',
        email: localStorage.getItem("email") || '',
        firstName: localStorage.getItem("firstName") || '',
        username: localStorage.getItem("firstName") || '',
        roleName: localStorage.getItem("roleName") || '',
        //    Accept: "",/////////////////////////
      }),
    };
  }


  successHandlerNotHideLoader(data: HttpErrorResponse) {
    this.successCheck(data, false);
  }
  successHandler(data: any) {
    this.successCheck(data);
    // this.util.handleLoader(false);

    // if (data['ResponseCode'] && data['ResponseCode'] != "00" && data['ResponseCode'] != "024") {
    //   this.util.failureSnackbar(data['ResponseMsg'])
    // } else if (data['ResponseCode'] == "00" && data['noOfRecord'] == "0") {
    //   this.util.failureSnackbar("no record found")
    // }
  }
  successCheck(data: any, isHideLoader = true) {
    if (isHideLoader) {
      this.util.handleLoader(false);
    }

    // 

    // && data['ResponseCode'] != "024"
    if (data["ResponseCode"] && data["ResponseCode"] != "00") {
      this.util.failureSnackbar(data["ResponseMsg"]);
    }
    // else if (data['ResponseCode'] == "00" && data['noOfRecord'] == "0") {
    //   this.util.failureSnackbar("no record found")
    // }
  }

  errorHandler(error: any) {
    // 
    this.util.handleLoader(false)
    // debugger
    // 

    try {
      let errMsg
      // 
      if (error.status === 401) {
        errMsg = error
        // window.location.reload();
      } else if (error.status === 400) {
        // this.http.post(`${this.environmentUrl}oauth/token?refresh_token&${localStorage.getItem('refresh_token')}grant_type=refresh_token&client_id=mmp_portal`, "", this.headers).pipe(catchError(this.errorHandler.bind(this))).pipe(tap(this.successHandler.bind(this)))
        // localStorage.clear()
        // location.reload()
        // debugger
        // 
        errMsg = error.error.error_description;
      } else if (error.status != null && error.statusText != null && error.status != 401) {
        errMsg = error.status == 0 ? 'The service is unavailable at this time' : `${error.status} ${error.statusText}`

        this.util.failureSnackbar(errMsg)
      } else if (error.message != null) {
        errMsg = error.message
      }
      else {
        errMsg = "Server Error"
        this.util.failureSnackbar(errMsg)
      }
      return throwError(errMsg);
    } catch (error) {
      // 
    }
    return "";

  }

  ///Authentication APIs
  loginUser(obj: any): Observable<any> {
    if (this.util.isRunProtoType) {
      return new Observable((subscribe) => {
        subscribe.next(this.editData.Login);
        subscribe.complete();
      });
    } else {
      
      this.util.handleLoader(true);
      this.headers.headers = this.headers.headers.set('email', obj.email);

      
      /* obj.grant_type = "password";
     obj.client_id = "ReconX_Client";
    const body = new HttpParams()
       .set("username", obj.username)
       .set("password", obj.password)
       .set("grant_type", "password")
       .set("client_id", "IWallet"); */
      // return this.http.post(`${this.environmentUrl}oauth/token?username=${obj.username}&password=${obj.password}&grant_type=${obj.grant_type}&client_id=${obj.client_id}`, "", this.headers).pipe(catchError(this.errorHandler.bind(this)))
      return this.http
        .post(
          `${this.environmentUrl}v1/auth/keycloak/login`,
          obj,
          this.headers
        )
        .pipe(catchError(this.errorHandler.bind(this)))
        .pipe(tap(this.successHandler.bind(this)));
    }
  }
  signUp(obj: any): Observable<any> {
    
    // this.headers.headers = this.headers.headers.set('institutionId', obj.institutionId);

    if (this.util.isRunProtoType) {
      return new Observable((subscribe) => {
        subscribe.next(this.editData.Users);
        subscribe.complete();
      });
    } else {
      this.util.handleLoader(true);
      

      return this.http
        .post(`${this.environmentUrl}v1/user/signup`,
          obj,
          this.headers
        )
        .pipe(catchError(this.errorHandler.bind(this)))
        .pipe(tap(this.successHandler.bind(this)));
    }
  }

  updatePassword(obj: any, id: any): Observable<any> {
    this.util.handleLoader(true);
    return this.http
      .post(
        `${this.environmentUrl}v1/user/change/password/${id}`,
        obj,
        this.restHeader()
      )
      .pipe(catchError(this.errorHandler.bind(this)))
      .pipe(tap(this.successHandler.bind(this)));
  }

  /// MEnu Api
  getMenuList(id: any): Observable<any> {
    if (this.util.isRunProtoType) {
      return new Observable((subscribe) => {
        // 
        subscribe.next(MenuList as any["default"]);
        subscribe.complete();
      });
    } else {
      // 
      this.util.handleLoader(true);
      return this.http
        .get<any>(`${this.environmentUrl}v1/common/getMenu/${id}`,

          this.restHeader())
        .pipe(catchError(this.errorHandler.bind(this)))
        .pipe(tap(this.successHandler.bind(this)));
    }
  }


  forgotPassword( obj: any): Observable<any> {
   
    if (this.util.isRunProtoType) {
      return new Observable((subscribe) => {
        subscribe.next(this.editData.Roles);
        subscribe.complete();
      });
    } else {
      
      this.util.handleLoader(true);
      
      return this.http
        .post(
          `${this.environmentUrl}v1/user/forgot/password`,
          obj,
          this.headers
        )
        .pipe(catchError(this.errorHandler.bind(this)))
        .pipe(tap(this.successHandler.bind(this)));
    }
  }

  
  resetPassword(obj: any): Observable<any> {
    if (this.util.isRunProtoType) {
      return new Observable((subscribe) => {
        subscribe.next(this.editData.Roles);
        subscribe.complete();
      });
    } else {
      this.util.handleLoader(true);
      
      return this.http
        .post(
          `${this.environmentUrl}v1/user/forgot/password/link`,
          obj,
          this.headers
        )
        .pipe(catchError(this.errorHandler.bind(this)))
        .pipe(tap(this.successHandler.bind(this)));
    }
  }


  restHeaderForGlobal() {
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "bearer " + (localStorage.getItem("access_token") || ""),
        userId: localStorage.getItem("userId") || "",
        roleId: localStorage.getItem("roleId") || "",
        email: localStorage.getItem("email") || "",
        firstName: localStorage.getItem("firstName") || "",
        username: localStorage.getItem("firstName") || "",
        roleName: localStorage.getItem("roleName") || "",
        Accept: "*",
      }),
    };
  }
  
 
 


  ///////////////////RefreshToken
  /* refreshToken(error: any) {
    // this.refreshTokenError += 1;
    
    let refreshToken = localStorage.getItem("refresh_token");
    
    if (refreshToken != null) {
      // return new Promise((resolve, reject) => { resolve; });
      if (error == 401) {
        return new Promise((resolve, reject) => {
          this.http
            .post(
              `${this.environmentUrl}v1/auth/keycloak/refresh-token-access`,
              this.data,
              this.headerForRefreshToken
            )
            .toPromise()
            .then(
              (res) => {
                // Success

                if (res as any["access_token"]) {
                  // localStorage.clear()
                  // 
                  // localStorage.removeItem('access_token')
                  // localStorage.removeItem('refresh_token')
                  // localStorage.removeItem('userName')
                  // localStorage.removeItem('userId')
                  // localStorage.removeItem('userGroupId')
                  // localStorage.removeItem('expires_in')

                  localStorage.setItem("access_token", (res as any)["access_token"]);
                  localStorage.setItem("refresh_token", (res as any)["refresh_token"]);
                  localStorage.setItem("userName", (res as any)["userName"]);
                  localStorage.setItem("userId", (res as any)["userId"]);
                  localStorage.setItem("userGroupId", (res as any)["userGroupId"]);
                  localStorage.setItem("expires_in", (res as any)["expires_in"]);
                  this.util.setSessionExpireTimeInLocalStorage((res as any)["expires_in"]);
                  // window.location.reload();
                  resolve("");
                } else {
                  // localStorage.clear();
                  this.router.navigate(["/login"]);

                  //unsubscribe for refresh function loop
                  this.util.subscription.unsubscribe();
                }
              },
              (msg) => {
                Error
                
                if (error == 401) {
                  this.dialog.closeAll();
                  this.util.failureSnackbar("Session Expired");
                  localStorage.clear();
                  this.router.navigate(["/page-login"]);
                } else {
                  reject(msg);
                }
                //unsubscribe for refresh function loop
                // this.util.subscription.unsubscribe()
                // if (error == 404) {
                //   this.util.failureSnackbar('Session Expire')
                //   localStorage.clear()
                //   this.router.navigate(['/login']);
                // }
              }
            );
        });
      } else {
        this.refreshTokenError = 0;
        return new Promise((resolve, reject) => {
          // this.router.navigate["/page-login"];
          reject("");
          // this.util.failureSnackbar('The service is unavailable at this time');
        });
        // alert(JSON.stringify(error));
      }
    }
  } */


    refreshToken(error: any): Promise<any> {
      const refreshToken = localStorage.getItem("refresh_token");
    
      if (refreshToken != null) {
        if (error === 401) {
          return new Promise((resolve, reject) => {
            this.http
              .post(
                `${this.environmentUrl}v1/auth/keycloak/refresh-token-access`,
                this.data,
                this.headerForRefreshToken
              )
              .toPromise()
              .then(
                (res: any) => {
                  if (res?.access_token) {
                    localStorage.setItem("access_token", res.access_token);
                    localStorage.setItem("refresh_token", res.refresh_token);
                    localStorage.setItem("userName", res.userName);
                    localStorage.setItem("userId", res.userId);
                    localStorage.setItem("userGroupId", res.userGroupId);
                    localStorage.setItem("expires_in", res.expires_in);
                    this.util.setSessionExpireTimeInLocalStorage(res.expires_in);
                    resolve("");
                  } else {
                    this.router.navigate(["/login"]);
                    this.util.subscription?.unsubscribe(); // Handle subscription cleanup
                    reject("Failed to refresh token");
                  }
                },
                (msg) => {
                  if (error === 401) {
                    this.dialog.closeAll();
                    this.util.failureSnackbar("Session Expired");
                    localStorage.clear();
                    this.router.navigate(["/page-login"]);
                  }
                  reject(msg);
                }
              );
          });
        } else {
          this.refreshTokenError = 0;
          return new Promise((_, reject) => {
            reject("Unauthorized access");
          });
        }
      } else {
        // Handle the case where refreshToken is null
        return Promise.reject("No refresh token available");
      }
    }
    

  getDropdown(type: any, obj?: any) {
    if (this.util.isRunProtoType) {
      return new Observable((subscribe) => {
        subscribe.next(this.setDropdownData(type));
        subscribe.complete();
      });
    } else {
      this.util.handleLoader(true);
      if (!obj) {
        obj = {};
      }
      return this.http
        .post(
          `${this.environmentUrl}v1/common/ddl/${type}`,
          obj,
          this.restHeader()
        )
        .pipe(catchError(this.errorHandler.bind(this)))
        .pipe(tap(this.successHandler.bind(this)));
    }
  }

  logoutSession() {
    let refreshToken = localStorage.getItem("refresh_token");
    

    if (refreshToken != null) {
      this.util.handleLoader(true);
      this.http
        .get(`${this.environmentUrl}v1/auth/logout/${refreshToken}`, this.restHeader())
        .subscribe(
          (res) => {
            localStorage.clear();
            this.router.navigate(["/page-login"]);
            this.util.handleLoader(false);
            //unsubscribe for refresh function loop
            // 
            // this.util.subscription.unsubscribe()
          },
          (ex) => {
            localStorage.clear();
            this.router.navigate(["/page-login"]);
            this.util.handleLoader(false);
            //unsubscribe for refresh function loop
            // 
            this.util.subscription.unsubscribe();
          }
        );
    }
  }

  setDropdownData(type: any, obj?: any) {
    let ResponseData: any = {};
    switch (type) {
      case this.util.ddListTypes.customerType:
        ResponseData = this.customerDropdown.ddlCutomerType;
        break;
      case this.util.ddListTypes.language:
        ResponseData = this.customerDropdown.ddlLanguage;
        break;
      case this.util.ddListTypes.gender:
        ResponseData = this.customerDropdown.ddlGender;
        break;
      case this.util.ddListTypes.countries:
        ResponseData = this.customerDropdown.ddlCountry;
        break;
      case this.util.ddListTypes.cities:
        ResponseData = this.customerDropdown.ddlCity;
        break;
      case this.util.ddListTypes.states:
        ResponseData = this.customerDropdown.ddlState;
        break;
      case this.util.ddListTypes.modeInfo:
        ResponseData = this.customerDropdown.ddlModeInfo;
        break;
      case this.util.ddListTypes.processByTxn:
        ResponseData = this.customerDropdown.ddlProcessByTxn;
        break;
      case this.util.ddListTypes.includeVAT:
        ResponseData = this.customerDropdown.ddlIncludeVat;
        break;
      case this.util.ddListTypes.commisssionFee:
        ResponseData = this.customerDropdown.ddlCommissionFee;
        break;
      case this.util.ddListTypes.useCase:
        ResponseData = this.customerDropdown.ddlUseCase;
        break;
      case this.util.ddListTypes.feeType:
        ResponseData = this.customerDropdown.ddlFeeType;
        break;
      case this.util.ddListTypes.institutionUnitPayee:
        ResponseData = this.customerDropdown.ddlInstitutionUnitPayee;
        break;
      case this.util.ddListTypes.payeeFee:
        ResponseData = this.customerDropdown.ddlPayeeFee;
        break;
      case this.util.ddListTypes.institutionUnitPayer:
        ResponseData = this.customerDropdown.ddlInstitutionUnitPayer;
        break;
      case this.util.ddListTypes.subTxnType:
        ResponseData = this.customerDropdown.ddlSubTxnType;
        break;
      case this.util.ddListTypes.piTypePayee:
        ResponseData = this.customerDropdown.ddlPiTypePayee;
        break;
      case this.util.ddListTypes.copyFromAuth:
        ResponseData = this.customerDropdown.ddlCopyFromAuth;
        break;
      case this.util.ddListTypes.piTypePayer:
        ResponseData = this.customerDropdown.ddlPiTypePayer;
        break;
      case this.util.ddListTypes.includeInLimit:
        ResponseData = this.customerDropdown.ddlIncludeInLimit;
        break;
      case this.util.ddListTypes.currency:
        ResponseData = this.customerDropdown.ddlCurrency;
        break;
      case this.util.ddListTypes.limitClass:
        ResponseData = this.customerDropdown.ddlLimitClass;
        break;
      case this.util.ddListTypes.glAccountType:
        ResponseData = this.customerDropdown.ddlGlAccountType;
        break;
      case this.util.ddListTypes.customer:
        ResponseData = this.customerDropdown.ddlCustomer;
        break;
      case this.util.ddListTypes.limitSet:
        ResponseData = this.customerDropdown.ddlLimitSet;
        break;
      case this.util.ddListTypes.feeSet:
        ResponseData = this.customerDropdown.ddlFeeSet;
        break;
      /*     case this.util.ddListTypes.useCaseNew:
            ResponseData = this.customerDropdown.ddlUseCaseNew;
            break; */
      case this.util.ddListTypes.institution:
        ResponseData = this.customerDropdown.ddlInstitution;
        break;
      case this.util.ddListTypes.method:
        ResponseData = this.customerDropdown.ddlMethode;
        break;
      case this.util.ddListTypes.searchTypeTransfer:
        ResponseData = this.customerDropdown.ddlSearchTypeTransfer;
        break;
      case this.util.ddListTypes.debitIdentityType:
        ResponseData = this.customerDropdown.ddlDebitIdentityType;
        break;
      case this.util.ddListTypes.creditIdentityType:
        ResponseData = this.customerDropdown.ddlCreditIdentityType;
        break;
      case this.util.ddListTypes.revokedRole:
        ResponseData = this.customerDropdown.ddlRevokedRole;
        break;
      case this.util.ddListTypes.blacklistReason:
        ResponseData = this.customerDropdown.ddlReason;
        break;
      case this.util.ddListTypes.role:
        ResponseData = this.customerDropdown.ddlRole;
        break;
      case this.util.ddListTypes.passwordPolicy:
        ResponseData = this.customerDropdown.ddlPasswordPolicy;
        break;

      default:
      // code block
    }
    return ResponseData;
  }




 

  getAllDashboards(obj: any): Observable<any> {
    this.util.handleLoader(true)
    return this.http.post(`${this.environmentUrl}v1/dashboard/getAllDashboard`, obj, this.restHeader()).pipe(catchError(this.errorHandler.bind(this))).pipe(tap(this.successHandler.bind(this)))
  }

  addDashboard(obj: any): Observable<any> {
    this.util.handleLoader(true)
    return this.http.post(`${this.environmentUrl}v1/dashboard/addDashboard`, obj, this.restHeader()).pipe(catchError(this.errorHandler.bind(this))).pipe(tap(this.successHandler.bind(this)))
  }
  updateDashboardDetail(obj: any, id: any): Observable<any> {
    this.util.handleLoader(true)
    return this.http.put(`${this.environmentUrl}v1/dashboard/editDashboard/${id}`, obj, this.restHeader()).pipe(catchError(this.errorHandler.bind(this))).pipe(tap(this.successHandler.bind(this)))
  }
  getDashboardDetail(id: any): Observable<any> {
    this.util.handleLoader(true)
    return this.http.get(`${this.environmentUrl}v1/dashboard/getDashboardById/${id}`, this.restHeader()).pipe(catchError(this.errorHandler.bind(this))).pipe(tap(this.successHandler.bind(this)))
  }

  dashboardStatus(id: any, obj: any): Observable<any> {
    this.util.handleLoader(true)
    return this.http.post(`${this.environmentUrl}v1/dashboard/activeInactive/${id}`, obj, this.restHeader()).pipe(catchError(this.errorHandler.bind(this))).pipe(tap(this.successHandler.bind(this)))
  }
  editStarred(id: any, obj: any): Observable<any> {
    this.util.handleLoader(true)
    return this.http.put(`${this.environmentUrl}v1/dashboard/starredUnStarredById/${id}`, obj, this.restHeader()).pipe(catchError(this.errorHandler.bind(this))).pipe(tap(this.successHandler.bind(this)))
  }
  editDefaultDashboard(id: any, obj: any): Observable<any> {
    this.util.handleLoader(true)
    return this.http.put(`${this.environmentUrl}v1/dashboard/setDefaultDashboard/${id}`, obj, this.restHeader()).pipe(catchError(this.errorHandler.bind(this))).pipe(tap(this.successHandler.bind(this)))
  }
  getStarredMenu(): Observable<any> {
    this.util.handleLoader(true)
    return this.http.post(`${this.environmentUrl}v1/dashboard/getAllDashboardStarred`, { pageIndex: 0, pageRecord: 20 }, this.restHeader()).pipe(catchError(this.errorHandler.bind(this))).pipe(tap(this.successHandler.bind(this)))
  }


 ////// USER APIS
 getUserList(obj: any): Observable<any> {
  if (this.util.isRunProtoType) {
    return new Observable((subscribe) => {
      subscribe.next(UserList as any["default"]);
      subscribe.complete();
    });
  } else {
    
    this.util.handleLoader(true);
    return this.http
      .post(
        `${this.environmentUrl}v1/user/users`,
        obj,
        this.restHeader()
      )
      .pipe(catchError(this.errorHandler.bind(this)))
      .pipe(tap(this.successHandler.bind(this)));
  }
}



addUser(obj: any): Observable<any> {
  if (this.util.isRunProtoType) {
    return new Observable((subscribe) => {
      subscribe.next(this.editData.Users);
      subscribe.complete();
    });
  } else {
    this.util.handleLoader(true);
    return this.http
      .post(`${this.environmentUrl}v1/user/add`, obj, this.restHeader())
      .pipe(catchError(this.errorHandler.bind(this)))
      .pipe(tap(this.successHandler.bind(this)));
  }
}
inviteUser(obj: any): Observable<any> {
  if (this.util.isRunProtoType) {
    return new Observable((subscribe) => {
      subscribe.next(this.editData.Users);
      subscribe.complete();
    });
  } else {
    this.util.handleLoader(true);
    return this.http
      .post(`${this.environmentUrl}v1/user/invite`, obj, this.restHeader())
      .pipe(catchError(this.errorHandler.bind(this)))
      .pipe(tap(this.successHandler.bind(this)));
  }
}
updateUserDetail(obj: any, id: any): Observable<any> {
  if (this.util.isRunProtoType) {
    return new Observable((subscribe) => {
      subscribe.next(this.editData.Users);
      subscribe.complete();
    });
  } else {
    this.util.handleLoader(true);
    return this.http
      .put(
        `${this.environmentUrl}v1/user/update/${id}`,
        obj,
        this.restHeader()
      )
      .pipe(catchError(this.errorHandler.bind(this)))
      .pipe(tap(this.successHandler.bind(this)));
  }
}



getUserDetail(id: any): Observable<any> {
  if (this.util.isRunProtoType) {
    return new Observable((subscribe) => {
      subscribe.next(this.editData.Users);
      subscribe.complete();
    });
  } else {
    this.util.handleLoader(true);
    return this.http
      .get(
        `${this.environmentUrl}v1/user/${id}`,
        this.restHeader()
      )
      .pipe(catchError(this.errorHandler.bind(this)))
      .pipe(tap(this.successHandler.bind(this)));
  }
}




 
getPosts(): Observable<any> {
  return this.http.get(`${this.environmentUrl}getAllUserList`);
}
getInstanceDetailsById(id: any): Observable<any> {
  const url = `${this.environmentUrl}getInstanceDataById/${id}`;
  console.log('API URL:', url);
  return this.http.get(url);
}
}
/*   getAll(id: any): Observable<any> {
    if (this.util.isRunProtoType) {
      return new Observable((subscribe) => {
        subscribe.next(this.editData.Roles);
        subscribe.complete();
      });
    } else {
      this.util.handleLoader(true);
      return this.http
        .get(
          `${this.environmentUrl}v1/payout/rule/${id}`,
          this.restHeader()
        )
        .pipe(catchError(this.errorHandler.bind(this)))
        .pipe(tap(this.successHandler.bind(this)));
    }
  }
 */