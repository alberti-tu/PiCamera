import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response, PictureOptions } from 'src/app/models/responses'; 

@Injectable({ providedIn: 'root' })
export class HttpService {

  constructor(private http: HttpClient) {}

  public async login(username: string, password: string): Promise<Observable<Response<string>>> {
    const body = { username, password };
    return this.http.post<Response<string>>(environment.url + '/api/login', body);
  }

  public async getCameraSettings(): Promise<Observable<Response<PictureOptions>>> {
    return this.http.get<Response<PictureOptions>>(environment.url + '/api/camera/settings');
  }

  public async setCameraSettings(body: PictureOptions): Promise<Observable<Response<boolean>>> {
    return this.http.post<Response<boolean>>(environment.url + '/api/camera/settings', body);
  }
}
