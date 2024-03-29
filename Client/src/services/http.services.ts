import axios from 'axios';
import { getPortNumber, getSerialNumber } from './utils.services';
import { configuration } from '../config';
import { encryptAES } from './authentication.services';
import { CameraOptions } from '../models/http.models';

export const url = configuration.protocol + '://' + configuration.host + ':' + getPortNumber(configuration.protocol, configuration.port);
export const id = getSerialNumber();

export function setup(): Promise<CameraOptions> {
	return new Promise<CameraOptions>((resolve, reject) => {
		axios.get<CameraOptions>(url + '/api/camera/' + encryptAES(id, configuration.sharedKey))
			.then(body => resolve(body?.data))
			.catch(err => reject(err?.response?.data))
	})
}

export function register(): Promise<boolean> {
	return new Promise<boolean>((resolve, reject) => {
		axios.post<boolean>(url + '/api/camera/' + encryptAES(id, configuration.sharedKey))
			.then(body => resolve(body?.data))
			.catch(err => reject(err?.response?.data))
	});
}

export function remove(): Promise<boolean> {
	return new Promise<boolean>((resolve, reject) => {
		axios.delete<boolean>(url + '/api/camera/' + encryptAES(id, configuration.sharedKey))
			.then(body => resolve(body?.data))
			.catch(err => reject(err?.response?.data))
	});
}

export function sendPicture(timestamp: Date, data: string): Promise<boolean> {
	return new Promise<boolean>((resolve, reject) => {
		const body = { timestamp: timestamp, data: data };
		axios.post<boolean>(url + '/api/camera/picture/' + encryptAES(id, configuration.sharedKey), body)
			.then(body => resolve(body?.data))
			.catch(err => reject(err?.response?.data))
	});
}
