const API_URL_LOCAL: String = 'http://localhost:8181';
const API_URL_UAT: String = 'https://uat-api.niji.studio/';
const API_URL_PRODUCTION: String = 'https://api.niji.studio/';
const API_ACTIVE_URL = API_URL_LOCAL;

export enum RequestType {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export class API {
  private API_ENDPOINT: string;
  private API_REQUEST_TYPE: RequestType;
  private API_PAYLOAD_REQUIRED: Boolean;
  private AUTHENTICATION_REQUIRED: Boolean;

  constructor(
    API_ENDPOINT: string,
    API_REQUEST_TYPE: RequestType,
    API_PAYLOAD_REQUIRED: Boolean,
    AUTHENTICATION_REQUIRED: Boolean
  ) {
    this.API_ENDPOINT = API_ENDPOINT;
    this.API_REQUEST_TYPE = API_REQUEST_TYPE;
    this.API_PAYLOAD_REQUIRED = API_PAYLOAD_REQUIRED;
    this.AUTHENTICATION_REQUIRED = AUTHENTICATION_REQUIRED;
  }

  public GetApiEndPoint() {
    return this.API_ENDPOINT;
  }

  public SetApiEndPoint(API_ENDPOINT: string) {
    this.API_ENDPOINT = API_ENDPOINT;
  }

  public GetApiRequestType() {
    return this.API_REQUEST_TYPE;
  }

  public SetApiRequestType(API_REQUEST_TYPE: RequestType) {
    this.API_REQUEST_TYPE = API_REQUEST_TYPE;
  }

  public GetApiPayloadRequired() {
    return this.API_PAYLOAD_REQUIRED;
  }

  public SetApiPayloadRequired(API_PAYLOAD_REQUIRED: Boolean) {
    this.API_PAYLOAD_REQUIRED = API_PAYLOAD_REQUIRED;
  }

  public GetAuthenticationRequired() {
    return this.AUTHENTICATION_REQUIRED;
  }

  public SetAuthenticationRequired(AUTHENTICATION_REQUIRED: Boolean) {
    this.AUTHENTICATION_REQUIRED = AUTHENTICATION_REQUIRED;
  }
}

export class ApiResponse {
  private responseCode: number;
  private success: Boolean;
  private message: string;
  private result: any;

  constructor(
    responseCode: number,
    success: Boolean,
    message: string,
    result: any
  ) {
    this.responseCode = responseCode;
    this.success = success;
    this.message = message;
    this.result = result;
  }

  public getResponseCode() {
    return this.responseCode;
  }

  public setResponseCode(responseCode: number) {
    this.responseCode = responseCode;
  }

  public getSuccess() {
    return this.success;
  }

  public setSuccess(success: Boolean) {
    this.success = success;
  }

  public getMessage() {
    return this.message;
  }

  public setMessage(message: string) {
    this.message = message;
  }

  public getResult() {
    return this.result;
  }

  public setResult(result: any) {
    this.result = result;
  }
}

export const API_ENDPOINTS = {
  API_URL: {
    API_INDEX: new API(
      API_ACTIVE_URL.concat('/cgp/cgp-sanction/v1/sanction/list'),
      RequestType.POST,
      true,
      false
    ),
    API_BULK_INDIVIDUAL: new API(
      API_ACTIVE_URL.concat('/cgp/cgp-sanction/v1/sanction/bulk'),
      RequestType.POST,
      true,
      false
    ),
  },
};
