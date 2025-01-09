import { Injectable } from '@angular/core';
import { UtilityService } from './utility.service';
import * as UseCaseList from '../jsonData/useCase.json';

@Injectable({
    providedIn: 'root'
})
export class CustomerRegistrationDropDown {
    constructor(public util: UtilityService,) {

    }
    ddlCutomerType = {
        "ResponseCode": "00",
        "Data": [
            { "text": "Beneficary", "value": 1, "att1": null, "att2": null, },
            { "text": "Merchant", "value": 2, "att1": null, "att2": null, },
            { "text": "Consumer", "value": 3, "att1": null, "att2": null, },
        ]
    };
    ddlGender = {
        "ResponseCode": "00",
        "Data": [
            { "text": "Male", "value": 1, "att1": null, "att2": null, },
            { "text": "Female", "value": 2, "att1": null, "att2": null, },
            { "text": "other", "value": 3, "att1": null, "att2": null, },
            { "text": "unknown", "value": 4, "att1": null, "att2": null, },
        ]
    };
    ddlLanguage = {
        "ResponseCode": "00",
        "Data": [
            { "text": "Urdu", "value": 1, "att1": null, "att2": null, },
            { "text": "English", "value": 2, "att1": null, "att2": null, },
            { "text": "Sindhi", "value": 3, "att1": null, "att2": null, },
            { "text": "Arabic", "value": 4, "att1": null, "att2": null, },
        ]
    };
    ddlCountry = {
        "ResponseCode": "00",
        "Data": [
            { "text": "Pakistan", "value": 1, "att1": null, "att2": null, },
            { "text": "USA", "value": 2, "att1": null, "att2": null, },
            { "text": "UAE", "value": 3, "att1": null, "att2": null, },
            
        ]
    };
    ddlCity = {
        "ResponseCode": "00",
        "Data": [
            { "text": "Hyderabad", "value": 1, "att1": null, "att2": null, },
            { "text": "karachi", "value": 2, "att1": null, "att2": null, },
            { "text": "New York", "value": 3, "att1": null, "att2": null, },
           
        ]
    };

    ddlState = {
        "ResponseCode": "00",
        "Data": [
            { "text": "California", "value": 1, "att1": null, "att2": null, },
            { "text": "Wisconsin", "value": 2, "att1": null, "att2": null, },
        ]
    };
    ddlModeInfo = {
        "ResponseCode": "00",
        "Data": [
            { "text": "SMS", "value": 1, "att1": null, "att2": null, },
            { "text": "Email", "value": 2, "att1": null, "att2": null, },
            { "text": "SMS and Email", "value": 3, "att1": null, "att2": null, },
        ]
    };

    ddlProcessByTxn =
        {
            "ResponseCode": "00",
            "Data": [
                { "text": "none", "value": 1, "att1": null, "att2": null, },
                { "text": "yes", "value": 2, "att1": null, "att2": null, },
                { "text": "no", "value": 3, "att1": null, "att2": null, },
            ]
        };

    ddlIncludeVat =
        {
            "ResponseCode": "00",
            "Data": [
                { "text": "none", "value": 1, "att1": null, "att2": null, },
                { "text": "yes", "value": 2, "att1": null, "att2": null, },
                { "text": "no", "value": 3, "att1": null, "att2": null, },
            ]
        };

    ddlCommissionFee =
        {
            "ResponseCode": "00",
            "Data": [
                { "text": "none", "value": 1, "att1": null, "att2": null, },
                { "text": "yes", "value": 2, "att1": null, "att2": null, },
                { "text": "no", "value": 3, "att1": null, "att2": null, },
            ]
        };

    ddlUseCase =
        {
            "ResponseCode": "00",
            "Data": [
                { "text": "Send money", "value": 1, "att1": null, "att2": null, },
                { "text": "Request money", "value": 2, "att1": null, "att2": null, },
            ]
        };

    ddlFeeType =
        {
            "ResponseCode": "00",
            "Data": [
                { "text": "test FeeType", "value": 1, "att1": null, "att2": null, },
            ]
        };

    ddlInstitutionUnitPayee =
        {
            "ResponseCode": "00",
            "Data": [
                { "text": "vanila", "value": 1, "att1": null, "att2": null, },
                { "text": "soapUi", "value": 2, "att1": null, "att2": null, },
            ]
        };

    ddlPayeeFee =
        {
            "ResponseCode": "00",
            "Data": [
                { "text": "none", "value": 1, "att1": null, "att2": null, },
                { "text": "yes", "value": 2, "att1": null, "att2": null, },
                { "text": "no", "value": 3, "att1": null, "att2": null, },
            ]
        };

    ddlInstitutionUnitPayer =
        {
            "ResponseCode": "00",
            "Data": [
                { "text": "vanila", "value": 1, "att1": null, "att2": null, },
                { "text": "soapUi", "value": 2, "att1": null, "att2": null, },
            ]
        };
    ddlSubTxnType =
        {
            "ResponseCode": "00",
            "Data": [
                { "text": "Authoristion", "value": 1, "att1": null, "att2": null, },
                { "text": "capture", "value": 2, "att1": null, "att2": null, },
            ]
        };
    ddlPiTypePayee =
        {
            "ResponseCode": "00",
            "Data": [
                { "text": "unit Trust", "value": 1, "att1": null, "att2": null, },
                { "text": "System SVA", "value": 2, "att1": null, "att2": null, },
            ]
        };
    ddlCopyFromAuth =
        {
            "ResponseCode": "00",
            "Data": [
                { "text": "none", "value": 1, "att1": null, "att2": null, },
                { "text": "yes", "value": 2, "att1": null, "att2": null, },
                { "text": "no", "value": 3, "att1": null, "att2": null, },
            ]
        };
    ddlPiTypePayer =
        {
            "ResponseCode": "00",
            "Data": [
                { "text": "unit Trust", "value": 1, "att1": null, "att2": null, },
                { "text": "System SVA", "value": 2, "att1": null, "att2": null, },
            ]
        };
    ddlIncludeInLimit =
        {
            "ResponseCode": "00",
            "Data": [
                { "text": "none", "value": 1, "att1": null, "att2": null, },
                { "text": "yes", "value": 2, "att1": null, "att2": null, },
                { "text": "no", "value": 3, "att1": null, "att2": null, },
            ]
        };

    ddlCurrency =
        {
            "ResponseCode": "00",
            "Data": [
                { "text": "Euro", "value": 1, "att1": null, "att2": null, },
                { "text": "Dollar", "value": 2, "att1": null, "att2": null, },
            ]
        };

    ddlLimitClass =
        {
            "ResponseCode": "00",
            "Data": [
                { "text": "Send money", "value": 1, "att1": null, "att2": null, },
                { "text": "Request money", "value": 2, "att1": null, "att2": null, },
            ]
        };

    ddlGlAccountType =
        {
            "ResponseCode": "00",
            "Data": [
                { "text": "parent", "value": 1, "att1": null, "att2": null, },
                { "text": "regular", "value": 2, "att1": null, "att2": null, },
                { "text": "expence/income", "value": 3, "att1": null, "att2": null, },
            ]
        };

    ddlCustomer =
        {
            "ResponseCode": "00",
            "Data": [
                { "text": "customer 1", "value": 1, "att1": null, "att2": null, },
                { "text": "customer 2", "value": 2, "att1": null, "att2": null, },
                { "text": "customer 3", "value": 3, "att1": null, "att2": null, },
            ]
        };
    ddlLimitSet =
        {
            "ResponseCode": "00",
            "Data": [
                { "text": "Global Limit", "value": 1, "att1": null, "att2": null, },
            ]
        };

    ddlFeeSet =
        {
            "ResponseCode": "00",
            "Data": [
                { "text": "Test FeeSet", "value": 1, "att1": null, "att2": null, },
            ]
        };
   /*  ddlUseCaseNew =
        {
            "ResponseCode": "00",
            "Data": this.util.createDropdownList(UseCaseList as any["default"].Data, "useCaseName", "useCaseId")
        };
 */
    ddlInstitution =
        {
            "ResponseCode": "00",
            "Data": [
                { "text": "Meezan", "value": 1, "att1": null, "att2": null, },
                { "text": "HBL 2", "value": 2, "att1": null, "att2": null, },
            ]
        };

    ddlMethode = {

        "ResponseCode": "00",
        "Data": [
            { "text": "method no 1", "value": 1, "att1": null, "att2": null, },
            { "text": "method no 2", "value": 2, "att1": null, "att2": null, },

        ]
    };
    ddlSearchTypeTransfer = {
        "ResponseCode": "00",
        "Data": [
            { "text": "Gl to Wallet", "value": 1, "att1": null, "att2": null, },
            { "text": "Wallet to Wallet", "value": 2, "att1": null, "att2": null, },
            { "text": "Gl to Gl", "value": 3, "att1": null, "att2": null, },
            { "text": "Wallet to Wallet", "value": 4, "att1": null, "att2": null, },
        ]
    };
    ddlDebitIdentityType = {
        "ResponseCode": "00",
        "Data": [
            { "text": "CNIC", "value": "nic", "att1": null, "att2": null, },
            { "text": "NTN", "value": "ntn", "att1": null, "att2": null, },
        ]
    };
    ddlCreditIdentityType = {
        "ResponseCode": "00",
        "Data": [
            { "text": "Citizen Id", "value": "nic", "att1": null, "att2": null, },
            { "text": "NTN", "value": "ntn", "att1": null, "att2": null, },
        ]
    };
    ddlRevokedRole = {
        "ResponseCode": "00",
        "Data": [

            { "text": "yes", "value": 1, "att1": null, "att2": null, },
            { "text": "no", "value": 2, "att1": null, "att2": null, },
        ]
    };
    ddlReason = {
        "ResponseCode": "00",
        "Data": [
            { "text": "Reason One", "value": 1, "att1": null, "att2": null, },
            { "text": "Reason Two", "value": 2, "att1": null, "att2": null, },
            { "text": "Reason Three", "value": 3, "att1": null, "att2": null, },
            { "text": "Reason Four", "value": 4, "att1": null, "att2": null, },
        ]
    };

    // ddlInstitution = {
    //     "ResponseCode": "00",
    //     "Data": [
    //         { "text": "Reason One", "value": 1, "att1": null, "att2": null, },
    //         { "text": "Reason One", "value": 2, "att1": null, "att2": null, },
    //         { "text": "Reason One", "value": 3, "att1": null, "att2": null, },
    //         { "text": "Reason One", "value": 4, "att1": null, "att2": null, },
    //     ]
    // };

    ddlRole = {
        "ResponseCode": "00",
        "Data": [

            { "text": "Admin", "value": 1, "att1": null, "att2": null, },
            { "text": "Supervisor", "value": 2, "att1": null, "att2": null, },
        ]
    };
    ddlPasswordPolicy = {
        "ResponseCode": "00",
        "Data": [
            { "text": "Default Policy", "value": 1, "att1": null, "att2": null, },
            { "text": "Ipath Policy", "value": 2, "att1": null, "att2": null, },
        ]
    };


}
