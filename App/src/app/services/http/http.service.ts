import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CameraSubscription, Message } from 'src/app/models/http.models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class HttpService {

	constructor(private http: HttpClient) {}

	public login(username: string, password: string): Observable<Message<string>> {
		const body = { username, password };
		return this.http.post<Message<string>>(environment.url + '/api/user/login', body);
	}

	public getSubscriptions(): Observable<Message<CameraSubscription[]>> {
		return this.http.get<Message<any>>(environment.url + '/api/subscription');
	}

	public addSubscription(id: string): Observable<Message<boolean>> {
		return this.http.post<Message<any>>(environment.url + '/api/subscription/' + id, null);
	}

	public updateSubscription(id: string, name: string): Observable<Message<boolean>> {
		const body = { id, name };
		return this.http.put<Message<any>>(environment.url + '/api/subscription', body);
	}

	public removeSubscription(id: string): Observable<Message<boolean>> {
		return this.http.delete<Message<any>>(environment.url + '/api/subscription/' + id);
	}
}
