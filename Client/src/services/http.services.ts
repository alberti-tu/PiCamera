import axios from 'axios';
import { getPortNumber, getSerialNumber } from './utils.services';
import { configuration } from '../config';
import { encryptAES } from './authentication.services';
import { CameraOptions, Message } from '../models/http.models';

axios.interceptors.response.use(response => {
	return Promise.resolve(response.data)
}, error => {
	return Promise.reject(error.response.data);
});

export const url = configuration.protocol + '://' + configuration.host + ':' + getPortNumber(configuration.protocol, configuration.port);
export const id = getSerialNumber();

export function setup(): Promise<CameraOptions> {
	return new Promise<CameraOptions>((resolve, reject) => {
		axios.get<Message<CameraOptions>>(url + '/api/camera/' + encryptAES(id, configuration.sharedKey))
			.then(body => resolve(body.data?.result))
			.catch(error => reject(error.data?.result));
	});
}

export function register(): Promise<boolean> {
	return new Promise<boolean>((resolve, reject) => {
		axios.post<Message<boolean>>(url + '/api/camera/' + encryptAES(id, configuration.sharedKey))
			.then(body => resolve(body.data?.result))
			.catch(error => reject(error.data?.result));
	});
}

export function remove(): Promise<boolean> {
	return new Promise<boolean>((resolve, reject) => {
		axios.delete<Message<boolean>>(url + '/api/camera/' + encryptAES(id, configuration.sharedKey))
			.then(body => resolve(body.data?.result))
			.catch(error => reject(error.data?.result));
	});
}

export function sendPicture(timestamp: Date, data: string): Promise<boolean> {
	return new Promise<boolean>((resolve, reject) => {
		const body = { timestamp: timestamp, data: data };
		axios.post<Message<boolean>>(url + '/api/camera/picture/' + encryptAES(id, configuration.sharedKey), body)
			.then(body => resolve(body.data?.result))
			.catch(error => reject(error.data?.result));
	});
}
