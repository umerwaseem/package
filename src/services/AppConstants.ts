import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class AppConstants {

    public fieldDefinitoionOprandType = {
        static: { value: "STATIC", text: "Static" },
        append: { value: "APPEND", text: "Append" },
        substring: { value: "SUB_STRING", text: "Substring Value" },
        copy: { value: "COPY", text: "Copy Value" },
    };

    public fieldDefinition = {
        constantDataTypes: {
            Integer: { value: "INTEGER", text: "Integer" },
            String: { value: "STRING", text: "String" },
            Date: { value: "DATE", text: "Date" },
        },
        constantDateFormats: [
            { value: "YYYYMMDD", text: "YYYYMMDD" },
            { value: "YYYYDDMM", text: "YYYYDDMM" },
            { value: "MMDDYYYY", text: "MMDDYYYY" },
            { value: "DDMMYYYY", text: "DDMMYYYY" },
        ],
        constantConditions: {
            equal: { value: "==", text: "Equal", relevantDataType: "" },
            notEqual: { value: "!=", text: "Not Equal", relevantDataType: "" },
            lessThan: { value: "<", text: "Less Than", relevantDataType: "" },
            greaterThan: { value: ">", text: "Greater Than", relevantDataType: "" },
            lessThanEqual: { value: "<=", text: "Less Than Equal", relevantDataType: "" },
            greaterThanEqual: { value: ">=", text: "Greater Than Equal", relevantDataType: "" },
            contains: { value: "contains", text: "Contains", relevantDataType: "" },
        },
        constantTargetFieldTypes: {
            field: { value: "FIELD", text: "Field" },
            static: { value: "STATIC", text: "Static" },
        },
    };

    public logicalOperator = {
        and: { value: "&&", text: "AND" },
        or: { value: "||", text: "OR" },
    };

    public formControlTypes = {
        text: { value: "text", text: "TEXT" },
        number: { value: "number", text: "NUMBER" },
        date: { value: "date", text: "DATE" },
    };

    public connectorType = {
        file: { value: "FILE", text: "FILE" },
        api: { value: "API", text: "API" },
    };

    public fileLocationType = {
        localDevice: { value: "LOCAL-DEVICE", text: "Local Device" },
        ftp: { value: "FTP", text: "FTP" },
        sftp: { value: "SFTP", text: "SFTP" },
    };

    public apiAuthenticationType = {
        basicAuth: { value: "basicAuth", text: "Basic Auth" },
        token: { value: "token", text: "Token" },
        noAuth: { value: "noAuth", text: "No Auth" },
      //  bearedToken: { value: "bearedToken", text: "Bearer Token" },
    };

    public fileCompressionType = {
        zip: { value: "zip", text: "Zip", },
        rar: { value: "rar", text: "Rar", },
        tar: { value: "tar", text: "Tar", },
    };

    public exportDataConnectors = {
        stripeInvoices: { value: "stripeInvoices", text: "Stripe Invoices", },
        stripePayout: { value: "stripePayout", text: "Stripe Payout", },
        stripeSessions: { value: "stripeSessions", text: "Stripe Sessions", },
        stripeTransactions: { value: "stripeTransactions", text: "Stripe Transactions", },
    };


    public reconStatusColorCodes = {
        autoMatched: { color: "#D4FFC4", text: "AUTO-MATCHED", value: "AUTO-MATCHED", },
        manualMatched: { color: "#A2D2FF", text: "MANUAL-MATCHED", value: "MANUAL-MATCHED", },
        partialMatched: { color: "#FFA823", text: "PARTIAL-MATCHED", value: "PARTIAL-MATCHED", },
        unmatched: { color: "#ecacac", text: "UNMATCHED", value: "UNMATCHED", },
        pending: { color: "#FFF455", text: "PENDING", value: "PENDING", },
        dropped: { color: "#D3D3D3", text: "DROPPED", value: "DROPPED", },

    };
    public httpRequestTypes = {
        GET: { text: "GET", value: "GET", },
        POST: { text: "POST", value: "POST", },
        /*         DELETE: {  text: "DELETE", value: "DELETE",  :},
                GET: {  text: "GET", value: "GET",  }, */
    }

    public connectorFormats = {
        bitmapped: { value: "BITMAPPED", text: "Bitmapped", attr1: this.connectorType.file.value },
        fixedLength: { value: "FIXED-LENGTH", text: "Fixed Length", attr1: this.connectorType.file.value },
        delimiter: { value: "DELIMITER", text: "Delimeter", attr1: this.connectorType.file.value },
      /*   ftp: { value: "FTP", text: "FTP", attr1: this.connectorType.file.value },
        sftp: { value: "SFTP", text: "SFTP", attr1: this.connectorType.file.value }, */
        json: { value: "JSON", text: "JSON", attr1: this.connectorType.api.value },
        xml: { value: "XML", text: "XML", attr1: this.connectorType.api.value },
        //prefix: { value: "XML", text: "XML", attr1: this.connectorType.api.value },
    }

    public fieldValidations ={
        ansSpecial:{value: "^(?=.*[A-Za-z0-9])[A-Za-z0-9 ._()-]+$", text: "alphanumeric(0-9, Aa-Zz, 0-9 Aa-Zz,  Aa-Zz 0-9) WITH spaces and special characters .-()_"},
        ans:{value:"^(?=.*[A-Za-z0-9])[A-Za-z0-9._()-]+$", text:"alphanumeric(0-9, Aa-Zz, 0-9 Aa-Zz,  Aa-Zz 0-9) WITHOUT spaces and special characters (.-_)"},
        url:{value:"^(https?:\/\/)?([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+)(:\d+)?(\/[^\s]*)?(\?[^\s]*)?(#[^\s]*)?$", text:"For URLs"},
        token:{value:"^(https?:\/\/)?([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+)(:\d+)?(\/[^\s]*)?(\?[^\s]*)?(#[^\s]*)?$", text:"For Auth Token"},
        cronExpression:{value:"^(?=.*[A-Za-z0-9])[A-Za-z0-9 */:?]+$", text:"alphanumeric(0-9, Aa-Zz, 0-9 Aa-Zz,  Aa-Zz 0-9) WITH spaces and special characters (* /:?)"},
        length: {value:"^[0-9]+$", text:"For lengths without dots"},
        email: {value: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", text: "for email"},
          password:{value: '^(?=.*[A-Za-z0-9])[A-Za-z0-9.\\-_/()\\\\:`!@#$%^&*=+~\'"<>?,;]+$',   text:"For Passwords"},
        number:{value:'Validators.pattern(/^\d+$/),'}
    }
    public payoutAggregatedFunctions = {
          
            sum: { value: "SUM", text: "Sum" },
            count: { value: "COUNT", text: "Count" },
            none: { value: "NONE", text: "None" },
 
    }

    public channelType={
                  
        bankingChannel: { value: "bankingChannel", text: "Banking Channel" },
        nonBankingChannel: { value: "nonBankingChannel", text: "Non Bannking Channel" },
    }


    public bitmappedDataElementIds= [
        {"Data field": 1, "Type": "b 16", "Usage": "Bitmap"},
        {"Data field": 2, "Type": "n..19", "Usage": "Primary account number (PAN)"},
        {"Data field": 3, "Type": "n 6", "Usage": "Processing Code"},
        {"Data field": 4, "Type": "n 12", "Usage": "Amount Transaction"},
        {"Data field": 5, "Type": "n 12", "Usage": "Amount, settlement"},
        {"Data field": 6, "Type": "n 12", "Usage": "Amount, cardholder billing"},
        {"Data field": 7, "Type": "n 10", "Usage": "Transmission date & time"},
        {"Data field": 8, "Type": "n 8", "Usage": "Amount, cardholder billing fee"},
        {"Data field": 9, "Type": "n 8", "Usage": "Conversion rate, settlement"},
        {"Data field": 10, "Type": "n 8", "Usage": "Conversion rate, cardholder billing"},
        {"Data field": 11, "Type": "n 6", "Usage": "System trace audit number (STAN)"},
        {"Data field": 12, "Type": "n 6", "Usage": "Local transaction time (hhmmss)"},
        {"Data field": 13, "Type": "n 4", "Usage": "Local transaction date (MMDD)"},
        {"Data field": 14, "Type": "n 4", "Usage": "Expiration date (YYMM)"},
        {"Data field": 15, "Type": "n 4", "Usage": "Settlement date"},
        {"Data field": 16, "Type": "n 4", "Usage": "Currency conversion date"},
        {"Data field": 17, "Type": "n 4", "Usage": "Capture date"},
        {"Data field": 18, "Type": "n 4", "Usage": "Merchant type, or merchant category code"},
        {"Data field": 19, "Type": "n 3", "Usage": "Acquiring institution (country code)"},
        {"Data field": 20, "Type": "n 3", "Usage": "PAN extended (country code)"},
        {"Data field": 21, "Type": "n 3", "Usage": "Forwarding institution (country code)"},
        {"Data field": 22, "Type": "n 3", "Usage": "Point of service entry mode"},
        {"Data field": 23, "Type": "n 3", "Usage": "Application PAN sequence number"},
        {"Data field": 24, "Type": "n 3", "Usage": "Function code (ISO 8583:1993), or network international identifier (NII)"},
        {"Data field": 25, "Type": "n 2", "Usage": "Point of service condition code"},
        {"Data field": 26, "Type": "n 2", "Usage": "Point of service capture code"},
        {"Data field": 27, "Type": "n 1", "Usage": "Authorizing identification response length"},
        {"Data field": 28, "Type": "x+n 8", "Usage": "Amount, transaction fee"},
        {"Data field": 29, "Type": "x+n 8", "Usage": "Amount, settlement fee"},
        {"Data field": 30, "Type": "x+n 8", "Usage": "Amount, transaction processing fee"},
        {"Data field": 31, "Type": "x+n 8", "Usage": "Amount, settlement processing fee"},
        {"Data field": 32, "Type": "n ..11", "Usage": "Acquiring institution identification code"},
        {"Data field": 33, "Type": "n ..11", "Usage": "Forwarding institution identification code"},
        {"Data field": 34, "Type": "ns ..28", "Usage": "Primary account number, extended"},
        {"Data field": 35, "Type": "z ..37", "Usage": "Track 2 data"},
        {"Data field": 36, "Type": "n ...104", "Usage": "Track 3 data"},
        {"Data field": 37, "Type": "an 12", "Usage": "Retrieval reference number"},
        {"Data field": 38, "Type": "an 6", "Usage": "Authorization identification response"},
        {"Data field": 39, "Type": "an 2", "Usage": "Response code"},
        {"Data field": 40, "Type": "an 3", "Usage": "Service restriction code"},
        {"Data field": 41, "Type": "ans 8", "Usage": "Card acceptor terminal identification"},
        {"Data field": 42, "Type": "ans 15", "Usage": "Card acceptor identification code"},
        {"Data field": 43, "Type": "ans 40", "Usage": "Card acceptor name/location"},
        {"Data field": 44, "Type": "an ..25", "Usage": "Additional response data"},
        {"Data field": 45, "Type": "an ..76", "Usage": "Track 1 data"},
        {"Data field": 46, "Type": "an ...999", "Usage": "Additional data (ISO)"},
        {"Data field": 47, "Type": "an ...999", "Usage": "Additional data (national)"},
        {"Data field": 48, "Type": "an ...999", "Usage": "Additional data (private)"},
        {"Data field": 49, "Type": "a or n 3", "Usage": "Currency code, transaction"},
        {"Data field": 50, "Type": "a or n 3", "Usage": "Currency code, settlement"},
        {"Data field": 51, "Type": "a or n 3", "Usage": "Currency code, cardholder billing"},
        {"Data field": 52, "Type": "b 64", "Usage": "Personal identification number data"},
        {"Data field": 53, "Type": "n 16", "Usage": "Security related control information"},
        {"Data field": 54, "Type": "an ...120", "Usage": "Additional amounts"},
        {"Data field": 55, "Type": "ans ...999", "Usage": "ICC data – EMV having multiple tags"},
        {"Data field": 56, "Type": "ans ...999", "Usage": "Reserved (ISO)"},
        {"Data field": 57, "Type": "ans ...999", "Usage": "Reserved (national)"},
        {"Data field": 58, "Type": "ans ...999", "Usage": "Reserved"},
        {"Data field": 59, "Type": "ans ...999", "Usage": "Reserved"},
        {"Data field": 60, "Type": "ans ...999", "Usage": "Reserved (national)"},
        {"Data field": 61, "Type": "ans ...999", "Usage": "Reserved (private)"},
        {"Data field": 62, "Type": "ans ...999", "Usage": "Reserved (private)"},
        {"Data field": 63, "Type": "ans ...999", "Usage": "Reserved (private)"},
        {"Data field": 64, "Type": "b 64", "Usage": "Message authentication code (MAC)"},
        {"Data field": 65, "Type": "b 1", "Usage": "Extended bitmap indicator"},
        {"Data field": 66, "Type": "n 1", "Usage": "Settlement code"},
        {"Data field": 67, "Type": "n 2", "Usage": "Extended payment code"},
        {"Data field": 68, "Type": "n 3", "Usage": "Receiving institution country code"},
        {"Data field": 69, "Type": "n 3", "Usage": "Settlement institution country code"},
        {"Data field": 70, "Type": "n 3", "Usage": "Network management information code"},
        {"Data field": 71, "Type": "n 4", "Usage": "Message number"},
        {"Data field": 72, "Type": "n 4", "Usage": "Last message's number"},
        {"Data field": 73, "Type": "n 6", "Usage": "Action date (YYMMDD)"},
        {"Data field": 74, "Type": "n 10", "Usage": "Number of credits"},
        {"Data field": 75, "Type": "n 10", "Usage": "Credits, reversal number"},
        {"Data field": 76, "Type": "n 10", "Usage": "Number of debits"},
        {"Data field": 77, "Type": "n 10", "Usage": "Debits, reversal number"},
        {"Data field": 78, "Type": "n 10", "Usage": "Transfer number"},
        {"Data field": 79, "Type": "n 10", "Usage": "Transfer, reversal number"},
        {"Data field": 80, "Type": "n 10", "Usage": "Number of inquiries"},
        {"Data field": 81, "Type": "n 10", "Usage": "Number of authorizations"},
        {"Data field": 82, "Type": "n 12", "Usage": "Credits, processing fee amount"},
        {"Data field": 83, "Type": "n 12", "Usage": "Credits, transaction fee amount"},
        {"Data field": 84, "Type": "n 12", "Usage": "Debits, processing fee amount"},
        {"Data field": 85, "Type": "n 12", "Usage": "Debits, transaction fee amount"},
        {"Data field": 86, "Type": "n 16", "Usage": "Total amount of credits"},
        {"Data field": 87, "Type": "n 16", "Usage": "Credits, reversal amount"},
        {"Data field": 88, "Type": "n 16", "Usage": "Total amount of debits"},
        {"Data field": 89, "Type": "n 16", "Usage": "Debits, reversal amount"},
        {"Data field": 90, "Type": "n 42", "Usage": "Original data elements"},
        {"Data field": 91, "Type": "an 1", "Usage": "File update code"},
        {"Data field": 92, "Type": "an 2", "Usage": "File security code"},
        {"Data field": 93, "Type": "an 5", "Usage": "Response indicator"},
        {"Data field": 94, "Type": "an 7", "Usage": "Service indicator"},
        {"Data field": 95, "Type": "an 42", "Usage": "Replacement amounts"},
        {"Data field": 96, "Type": "b 64", "Usage": "Message security code"},
        {"Data field": 97, "Type": "x+n 16", "Usage": "Net settlement amount"},
        {"Data field": 98, "Type": "ans 25", "Usage": "Payee"},
        {"Data field": 99, "Type": "n ..11", "Usage": "Settlement institution identification code"},
        {"Data field": 100, "Type": "n ..11", "Usage": "Receiving institution identification code"},
        {"Data field": 101, "Type": "ans ..17", "Usage": "File name"},
        {"Data field": 102, "Type": "ans ..28", "Usage": "Account identification 1"},
        {"Data field": 103, "Type": "ans ..28", "Usage": "Account identification 2"},
        {"Data field": 104, "Type": "ans ...100", "Usage": "Transaction description"},
        {"Data field": 105, "Type": "ans ...999", "Usage": "Reserved for ISO use"},
        {"Data field": 106, "Type": "ans ...999", "Usage": "Reserved for ISO use"},
        {"Data field": 107, "Type": "ans ...999", "Usage": "Reserved for ISO use"},
        {"Data field": 108, "Type": "ans ...999", "Usage": "Reserved for ISO use"},
        {"Data field": 109, "Type": "ans ...999", "Usage": "Reserved for ISO use"},
        {"Data field": 110, "Type": "ans ...999", "Usage": "Reserved for ISO use"},
        {"Data field": 111, "Type": "ans ...999", "Usage": "Reserved for ISO use"},
        {"Data field": 112, "Type": "ans ...999", "Usage": "Reserved for national use"},
        {"Data field": 113, "Type": "ans ...999", "Usage": "Reserved for national use"},
        {"Data field": 114, "Type": "ans ...999", "Usage": "Reserved for national use"},
        {"Data field": 115, "Type": "ans ...999", "Usage": "Reserved for national use"},
        {"Data field": 116, "Type": "ans ...999", "Usage": "Reserved for national use"},
        {"Data field": 117, "Type": "ans ...999", "Usage": "Reserved for national use"},
        {"Data field": 118, "Type": "ans ...999", "Usage": "Reserved for national use"},
        {"Data field": 119, "Type": "ans ...999", "Usage": "Reserved for national use"},
        {"Data field": 120, "Type": "ans ...999", "Usage": "Reserved for private use"},
        {"Data field": 121, "Type": "ans ...999", "Usage": "Reserved for private use"},
        {"Data field": 122, "Type": "ans ...999", "Usage": "Reserved for private use"},
        {"Data field": 123, "Type": "ans ...999", "Usage": "Reserved for private use"},
        {"Data field": 124, "Type": "ans ...999", "Usage": "Reserved for private use"},
        {"Data field": 125, "Type": "ans ...999", "Usage": "Reserved for private use"},
        {"Data field": 126, "Type": "ans ...999", "Usage": "Reserved for private use"},
        {"Data field": 127, "Type": "ans ...999", "Usage": "Reserved for private use"},
        {"Data field": 128, "Type": "b 64", "Usage": "Message authentication code"}
    ];

    public chartsTypes = {
        line: {type : "line"},
        bar: {type : "bar"},
        pie: {type : "pie"},
        table: {type : "table"},
        card: {type : "card"},
        horizontalBar: {type : "horizontalBar"},
    };




    constructor() {

        this.fieldDefinition.constantConditions.equal.relevantDataType = this.fieldDefinition.constantDataTypes.Date.value + " " +
            this.fieldDefinition.constantDataTypes.String.value + " " +
            this.fieldDefinition.constantDataTypes.Integer.value;

        this.fieldDefinition.constantConditions.notEqual.relevantDataType = this.fieldDefinition.constantDataTypes.Date.value + " " +
            this.fieldDefinition.constantDataTypes.String.value + " " +
            this.fieldDefinition.constantDataTypes.Integer.value;

        this.fieldDefinition.constantConditions.greaterThan.relevantDataType = this.fieldDefinition.constantDataTypes.Date.value + " " +
            this.fieldDefinition.constantDataTypes.Integer.value;

        this.fieldDefinition.constantConditions.lessThan.relevantDataType = this.fieldDefinition.constantDataTypes.Date.value + " " +
            this.fieldDefinition.constantDataTypes.Integer.value;

        this.fieldDefinition.constantConditions.greaterThanEqual.relevantDataType = this.fieldDefinition.constantDataTypes.Date.value + " " +
            this.fieldDefinition.constantDataTypes.Integer.value;

        this.fieldDefinition.constantConditions.lessThanEqual.relevantDataType = this.fieldDefinition.constantDataTypes.Date.value + " " +

            this.fieldDefinition.constantDataTypes.Integer.value;

        this.fieldDefinition.constantConditions.contains.relevantDataType = this.fieldDefinition.constantDataTypes.String.value;

    }

}
