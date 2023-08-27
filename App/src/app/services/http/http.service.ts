import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getPath } from 'src/app/global/utils';
import { ApiURL } from 'src/app/constants/routes';
import { ICameraOptions, ICameraSubscription, IFilters, IUser } from 'src/app/models/http.models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class HttpService {

	constructor(private http: HttpClient) {}

	public login(username: string, password: string): Observable<string> {
		return this.http.post(environment.url + getPath(ApiURL.LOGIN), { username, password }, { responseType: 'text' });
	}

	public register(username: string, password: string): Observable<boolean> {
		return this.http.post<boolean>(environment.url + getPath(ApiURL.USER), { username, password });
	}

	public getUser(): Observable<IUser> {
		return this.http.get<IUser>(environment.url + getPath(ApiURL.USER));
	}

	public updateUser(username?: string, password?: string): Observable<boolean> {
		return this.http.put<boolean>(environment.url + getPath(ApiURL.USER), { username, password });
	}

	public removeUser(): Observable<boolean> {
		return this.http.delete<boolean>(environment.url + getPath(ApiURL.USER));
	}

	public getAllSubscriptions(): Observable<ICameraSubscription[]> {
		return this.http.get<ICameraSubscription[]>(environment.url + getPath(ApiURL.SUBSCRIPTION));
	}

	public getOneSubscription(id: string): Observable<ICameraSubscription> {
		return this.http.get<ICameraSubscription>(environment.url + getPath(ApiURL.SUBSCRIPTION_BY_ID, { id }));
	}

	public addSubscription(id: string): Observable<boolean> {
		return this.http.post<boolean>(environment.url + getPath(ApiURL.SUBSCRIPTION_BY_ID, { id }), null);
	}

	public updateSubscription(id: string, name: string): Observable<boolean> {
		return this.http.put<boolean>(environment.url + getPath(ApiURL.SUBSCRIPTION), { id, name });
	}

	public removeSubscription(id: string): Observable<boolean> {
		return this.http.delete<boolean>(environment.url + getPath(ApiURL.SUBSCRIPTION_BY_ID, { id }));
	}

	public getSettings(id: string): Observable<ICameraOptions> {
		return this.http.get<ICameraOptions>(environment.url + getPath(ApiURL.CAMERA_BY_ID, { id }));
	}

	public saveSettings(id: string, body: ICameraOptions): Observable<boolean> {
		return this.http.post<boolean>(environment.url + getPath(ApiURL.CAMERA_BY_ID, { id }), body);
	}

	public getFilters(): Observable<IFilters[]> {
		return this.http.get<IFilters[]>(environment.url + getPath(ApiURL.SETTINGS_FILTERS));
	}

	public getFolderId(id: string): Observable<string[]> {
		return this.http.get<string[]>(environment.url + getPath(ApiURL.PICTURE_BY_ID, { id }));
	}

	public savePicture(id: string, data: string): Observable<boolean> {
		return this.http.post<boolean>(environment.url + getPath(ApiURL.PICTURE_BY_ID, { id }), { data });
	}

	public getPicture(id: string, name: string): Observable<string> {
		return this.http.get(environment.url + getPath(ApiURL.PICTURE_BY_NAME, { id, name }), { responseType: 'text' });
	}

	public removePicture(id: string, name: string): Observable<boolean> {
		return this.http.delete<boolean>(environment.url + getPath(ApiURL.PICTURE_BY_NAME, { id, name }));
	}

}
