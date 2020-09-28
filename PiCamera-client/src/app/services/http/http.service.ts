import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  public async savePicture(): Promise<Observable<Response<PictureOptions>>> {
    return this.http.get<Response<PictureOptions>>(environment.url + '/api/files');
  }

  public async getPictureDirectory(page: number, size: number): Promise<Observable<Response<any>>> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<Response<any>>(environment.url + '/api/directory', { params });
  }

  public async getPictureDirectoryCount(): Promise<Observable<Response<number>>> {
    return this.http.get<Response<any>>(environment.url + '/api/directory/count');
  }

  public async getPictureFile(id: string): Promise<Observable<Response<any>>> {
    return this.http.get<Response<any>>(environment.url + '/api/files/' + id);
  }

  public async getCameraSettings(): Promise<Observable<Response<PictureOptions>>> {
    return this.http.get<Response<PictureOptions>>(environment.url + '/api/settings');
  }

  public async setCameraSettings(body: PictureOptions): Promise<Observable<Response<boolean>>> {
    return this.http.post<Response<boolean>>(environment.url + '/api/settings', body);
  }
}
