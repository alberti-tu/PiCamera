import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'src/app/models/http.models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class HttpService {

	constructor(private http: HttpClient) {}

	public login(username: string, password: string): Observable<Message<string>> {
		const body = { username, password };
		return this.http.post<Message<string>>(environment.url + '/api/user/login', body);
	}
}
