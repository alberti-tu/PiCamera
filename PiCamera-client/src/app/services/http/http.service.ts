import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class HttpService {

  constructor(private http: HttpClient) {}

  /*
  public async login(username: string, password: string): Promise<Observable<Response<string>>> {
    const body = { username, password };
    return this.http.post<Response<string>>(environment.url + '/api/login', body);
  }
  */
}
