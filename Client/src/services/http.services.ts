import axios from 'axios';
import { getSerialNumber } from './utils.services';
import { configuration } from '../config';
import { encryptAES } from './authentication.services';
import { CameraOptions, Message } from '../models/http.models';

const url = configuration.protocol + '://' + configuration.host + ':' + configuration.port;
const id = getSerialNumber();

export function setup(): Promise<CameraOptions> {
	return new Promise<CameraOptions>((resolve, reject) => {
		axios.get<Message<CameraOptions>>(url + '/api/camera/' + encryptAES(id, configuration.sharedKey))
			.then(body => resolve(body.data ? body.data.result : null))
			.catch(err => reject(err.response ? err.response.data.result : null));
	});
}

export function register(): Promise<boolean> {
	return new Promise<boolean>((resolve, reject) => {
		axios.post<Message<boolean>>(url + '/api/camera/' + encryptAES(id, configuration.sharedKey))
			.then(body => resolve(body.data ? body.data.result : null))
			.catch(err => reject(err.response ? err.response.data.result : null));
	});
}

export function remove(): Promise<boolean> {
	return new Promise<boolean>((resolve, reject) => {
		axios.delete<Message<boolean>>(url + '/api/camera/' + encryptAES(id, configuration.sharedKey))
			.then(body => resolve(body.data ? body.data.result : null))
			.catch(err => reject(err.response ? err.response.data.result : null));
	});
}

export function sendPicture(timestamp: Date, data: string): Promise<boolean> {
	return new Promise<boolean>((resolve, reject) => {
		const body = { timestamp: timestamp, data: data };
		axios.post<Message<boolean>>(url + '/api/camera/picture/' + encryptAES(id, configuration.sharedKey), body)
			.then(body => resolve(body.data ? body.data.result : null))
			.catch(err => reject(err.response ? err.response.data.result : null));
	});
}
