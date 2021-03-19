import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CameraOptions, CameraSubscription, Message } from 'src/app/models/http.models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class HttpService {

	constructor(private http: HttpClient) {}

	public login(username: string, password: string): Observable<Message<string>> {
		const body = { username, password };
		return this.http.post<Message<string>>(environment.url + '/api/user/login', body);
	}

	public getAllSubscriptions(): Observable<Message<CameraSubscription[]>> {
		return this.http.get<Message<CameraSubscription[]>>(environment.url + '/api/subscription');
	}

	public getOneSubscription(cameraId: string): Observable<Message<CameraSubscription>> {
		return this.http.get<Message<CameraSubscription>>(environment.url + '/api/subscription/' + cameraId);
	}

	public addSubscription(id: string): Observable<Message<boolean>> {
		return this.http.post<Message<boolean>>(environment.url + '/api/subscription/' + id, null);
	}

	public updateSubscription(id: string, name: string): Observable<Message<boolean>> {
		const body = { id, name };
		return this.http.put<Message<boolean>>(environment.url + '/api/subscription', body);
	}

	public removeSubscription(id: string): Observable<Message<boolean>> {
		return this.http.delete<Message<boolean>>(environment.url + '/api/subscription/' + id);
	}

	public getSettings(id: string): Observable<Message<CameraOptions>> {
		return this.http.get<Message<CameraOptions>>(environment.url + '/api/settings/camera/' + id);
	}

	public saveSettings(id: string, body: CameraOptions): Observable<Message<boolean>> {
		return this.http.post<Message<boolean>>(environment.url + '/api/settings/camera/' + id, body);
	}

	public getFilters(): Observable<Message<string[]>> {
		return this.http.get<Message<string[]>>(environment.url + '/api/settings/filters');
	}

	public getFolderId(id: string): Observable<Message<string[]>> {
		return this.http.get<Message<string[]>>(environment.url + '/api/picture/' + id);
	}

	public savePicture(id: string, data: string): Observable<Message<boolean>> {
		const body = { data };
		return this.http.post<Message<boolean>>(environment.url + '/api/picture/' + id, body);
	}

	public getPicture(id: string, name: string): Observable<Message<string>> {
		return this.http.get<Message<string>>(environment.url + '/api/picture/' + id + '/' + name);
	}

	public removePicture(id: string, name: string): Observable<Message<boolean>> {
		return this.http.delete<Message<boolean>>(environment.url + '/api/picture/' + id + '/' + name);
	}
}
