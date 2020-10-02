import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response, PictureOptions } from 'src/app/models/responses'; 

@Injectable({ providedIn: 'root' })
export class HttpService {

  constructor(private http: HttpClient) {}

  public login(username: string, password: string): Observable<Response<string>> {
    const body = { username, password };
    return this.http.post<Response<string>>(environment.url + '/api/login', body);
  }

  public savePicture(): Observable<Response<PictureOptions>> {
    return this.http.get<Response<PictureOptions>>(environment.url + '/api/camera');
  }

  public getPictureDirectory(page: number, size: number): Observable<Response<string[]>> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<Response<string[]>>(environment.url + '/api/directory', { params });
  }

  public getPictureDirectoryCount(): Observable<Response<number>> {
    return this.http.get<Response<number>>(environment.url + '/api/directory/count');
  }

  public getPictureFile(id: string): Observable<Response<string>> {
    return this.http.get<Response<string>>(environment.url + '/api/file/' + id);
  }

  public removePictureFile(id: string): Observable<Response<boolean>> {
    return this.http.delete<Response<boolean>>(environment.url + '/api/file/' + id);
  }

  public getCameraSettings(): Observable<Response<PictureOptions>> {
    return this.http.get<Response<PictureOptions>>(environment.url + '/api/settings');
  }

  public setCameraSettings(body: PictureOptions): Observable<Response<boolean>> {
    return this.http.post<Response<boolean>>(environment.url + '/api/settings', body);
  }
  
}
