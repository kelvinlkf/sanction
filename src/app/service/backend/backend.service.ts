import { Injectable } from '@angular/core';
import { RequestType, API } from '../api.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  public USER_ID_KEY: string = 'userId';
  public JSON_WEB_TOKEN_KEY: string = 'jsonWebToken';

  public setKey(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  public getKey(key: string) {
    return localStorage.getItem(key) == null
      ? null
      : localStorage.getItem(key)?.toString();
  }

  public removeKey(key: string) {
    localStorage.removeItem(key);
  }

  constructor(private httpClient: HttpClient) {}

  public apiCall(
    api: API,
    payload?: any,
    params?: string[],
    values?: string[],
    query?: Record<string, string>,
    headers?: Record<string, string>
  ) {
    if (api.GetApiPayloadRequired()) {
      if (payload == null) {
        throw new Error('Payload is missing for payload required API.');
      }
    }

    let url = api.GetApiEndPoint();
    if (
      params != null &&
      params.length > 0 &&
      values != null &&
      values.length > 0
    ) {
      for (let x = 0; x < params.length; x++) {
        url = url.replace('{' + params[x] + '}', values[x].toString());
      }
    }

    if (query) {
      Object.keys(query).forEach((q, index) => {
        if (index === 0) {
          url += `?${q}=${query[q]}`;
        } else {
          url += `&${q}=${query[q]}`;
        }
      });
    }

    let requestHeaders: HttpHeaders = new HttpHeaders();
    if (headers) {
      Object.keys(headers).forEach((q) => {
        requestHeaders = requestHeaders.append(q, headers[q]);
      });
    }
    if (
      this.getKey(this.JSON_WEB_TOKEN_KEY) ||
      api.GetAuthenticationRequired()
    ) {
      if (!this.getKey(this.JSON_WEB_TOKEN_KEY)) {
        throw new Error('User is not authenticated to perform such action.');
      }

      requestHeaders = requestHeaders.append(
        'Authorization',
        `Bearer ${this.getKey(this.JSON_WEB_TOKEN_KEY)}`
      );
    }

    const properties: { responseType?: string } = {};

    return new Promise((resolve, reject) => {
      switch (api.GetApiRequestType()) {
        case RequestType.GET:
          return this.httpClient
            .get(url, { headers: requestHeaders })
            .subscribe(
              (result) => {
                resolve(result);
              },
              (error) => {
                reject(error);
              }
            );
        case RequestType.POST:
          console.log(api.GetApiEndPoint());
          return this.httpClient
            .post(url, payload, {
              headers: requestHeaders,
            })
            .subscribe(
              (result: any) => {
                resolve(result);
              },
              (error) => {
                // console.log(error);
                reject(error);
              }
            );
        case RequestType.PATCH:
          throw new Error('Api method not allowed.');
        case RequestType.DELETE:
          throw new Error('Api method not allowed.');
        default:
          throw new Error('Api method not allowed.');
      }
    });
  }
}
