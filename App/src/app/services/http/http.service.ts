import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getPath } from 'src/app/global/utils';
import { ApiURL } from 'src/app/constants/routes';
import { ICameraOptions, ICameraSubscription, Message } from 'src/app/models/http.models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class HttpService {

	constructor(private http: HttpClient) {}

	public login(username: string, password: string): Observable<Message<string>> {
		const body = { username, password };
		return this.http.post<any>(environment.url + getPath(ApiURL.LOGIN), body);
	}

	public register(username: string, password: string): Observable<Message<string>> {
		const body = { username, password };
		return this.http.post<any>(environment.url + getPath(ApiURL.USER), body);
	}

	public getUser(): Observable<Message<any>> {
		return this.http.get<any>(environment.url + getPath(ApiURL.USER));
	}

	public updateUser(username?: string, password?: string): Observable<Message<boolean>> {
		const body = { username, password };
		return this.http.put<any>(environment.url + getPath(ApiURL.USER), body);
	}

	public removeUser(): Observable<Message<boolean>> {
		return this.http.delete<any>(environment.url + getPath(ApiURL.USER));
	}

	public getAllSubscriptions(): Observable<Message<ICameraSubscription[]>> {
		return this.http.get<any>(environment.url + getPath(ApiURL.SUBSCRIPTION));
	}

	public getOneSubscription(id: string): Observable<Message<ICameraSubscription>> {
		return this.http.get<any>(environment.url + getPath(ApiURL.SUBSCRIPTION_BY_ID, { id }));
	}

	public addSubscription(id: string): Observable<Message<boolean>> {
		return this.http.post<any>(environment.url + getPath(ApiURL.SUBSCRIPTION_BY_ID, { id }), null);
	}

	public updateSubscription(id: string, name: string): Observable<Message<boolean>> {
		const body = { id, name };
		return this.http.put<any>(environment.url + getPath(ApiURL.SUBSCRIPTION), body);
	}

	public removeSubscription(id: string): Observable<Message<boolean>> {
		return this.http.delete<any>(environment.url + getPath(ApiURL.SUBSCRIPTION_BY_ID, { id }));
	}

	public getSettings(id: string): Observable<Message<ICameraOptions>> {
		return this.http.get<any>(environment.url + getPath(ApiURL.CAMERA_BY_ID, { id }));
	}

	public saveSettings(id: string, body: ICameraOptions): Observable<Message<boolean>> {
		return this.http.post<any>(environment.url + getPath(ApiURL.CAMERA_BY_ID, { id }), body);
	}

	public getFilters(): Observable<Message<string[]>> {
		return this.http.get<any>(environment.url + getPath(ApiURL.SETTINGS_FILTERS));
	}

	public getFolderId(id: string): Observable<Message<string[]>> {
		return this.http.get<any>(environment.url + getPath(ApiURL.PICTURE_BY_ID, { id }));
	}

	public savePicture(id: string, data: string): Observable<Message<boolean>> {
		const body = { data };
		return this.http.post<any>(environment.url + getPath(ApiURL.PICTURE_BY_ID, { id }), body);
	}

	public getPicture(id: string, name: string): Observable<Message<string>> {
		return this.http.get<any>(environment.url + getPath(ApiURL.PICTURE_BY_NAME, { id, name }));
	}

	public removePicture(id: string, name: string): Observable<Message<boolean>> {
		return this.http.delete<any>(environment.url + getPath(ApiURL.PICTURE_BY_NAME, { id, name }));
	}

}
