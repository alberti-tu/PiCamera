import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiURL } from 'src/app/constants/routes';
import { CameraOptions, CameraSubscription, Message } from 'src/app/models/http.models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class HttpService {

	constructor(private http: HttpClient) {}

	public login(username: string, password: string): Observable<Message<string>> {
		const body = { username, password };
		return this.http.post<any>(environment.url + ApiURL.login, body);
	}

	public register(username: string, password: string): Observable<Message<string>> {
		const body = { username, password };
		return this.http.post<any>(environment.url + ApiURL.user, body);
	}

	public getUser(): Observable<Message<any>> {
		return this.http.get<any>(environment.url + ApiURL.user);
	}

	public updateUser(username?: string, password?: string): Observable<Message<boolean>> {
		const body = { username, password };
		return this.http.put<any>(environment.url + ApiURL.user, body);
	}

	public removeUser(): Observable<Message<boolean>> {
		return this.http.delete<any>(environment.url + ApiURL.user);
	}

	public getAllSubscriptions(): Observable<Message<CameraSubscription[]>> {
		return this.http.get<any>(environment.url + ApiURL.subscription);
	}

	public getOneSubscription(cameraId: string): Observable<Message<CameraSubscription>> {
		return this.http.get<any>(environment.url + ApiURL.subscription + cameraId);
	}

	public addSubscription(cameraId: string): Observable<Message<boolean>> {
		return this.http.post<any>(environment.url + ApiURL.subscription + cameraId, null);
	}

	public updateSubscription(id: string, name: string): Observable<Message<boolean>> {
		const body = { id, name };
		return this.http.put<any>(environment.url + ApiURL.subscription, body);
	}

	public removeSubscription(id: string): Observable<Message<boolean>> {
		return this.http.delete<any>(environment.url + ApiURL.subscription + id);
	}

	public getSettings(cameraId: string): Observable<Message<CameraOptions>> {
		return this.http.get<any>(environment.url + ApiURL.settings_camera + cameraId);
	}

	public saveSettings(cameraId: string, body: CameraOptions): Observable<Message<boolean>> {
		return this.http.post<any>(environment.url + ApiURL.settings_camera + cameraId, body);
	}

	public getFilters(): Observable<Message<string[]>> {
		return this.http.get<any>(environment.url + ApiURL.settings_filters);
	}

	public getFolderId(cameraId: string): Observable<Message<string[]>> {
		return this.http.get<any>(environment.url + ApiURL.picture + cameraId);
	}

	public savePicture(cameraId: string, data: string): Observable<Message<boolean>> {
		const body = { data };
		return this.http.post<any>(environment.url + ApiURL.picture + cameraId, body);
	}

	public getPicture(cameraId: string, name: string): Observable<Message<string>> {
		return this.http.get<any>(environment.url + ApiURL.picture + cameraId + '/' + name);
	}

	public removePicture(cameraId: string, name: string): Observable<Message<boolean>> {
		return this.http.delete<any>(environment.url + ApiURL.picture + cameraId + '/' + name);
	}

}
