import axios from 'axios';
import { getSerialNumber } from './utils.services';
import { configuration } from '../config';
import { encrypt } from './authentication.services';
import { Message, PictureOptions } from '../models/http.models';

const url = configuration.protocol + '://' + configuration.host + ':' + configuration.port;
const id = getSerialNumber();

export function setup(): Promise<PictureOptions> {
    return new Promise<PictureOptions>((resolve, reject) => {
        axios.get<Message<PictureOptions>>(url + '/api/camera/' + encrypt(id, configuration.sharedKey))
            .then(body => resolve(body.data ? body.data.result : null))
            .catch(err => reject(err.response ? err.response.data.result : null));
    });
}

export function register(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        axios.post<Message<boolean>>(url + '/api/camera/' + encrypt(id, configuration.sharedKey))
            .then(body => resolve(body.data ? body.data.result : null))
            .catch(err => reject(err.response ? err.response.data.result : null));
    });
}

export function remove(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        axios.delete<Message<boolean>>(url + '/api/camera/' + encrypt(id, configuration.sharedKey))
            .then(body => resolve(body.data ? body.data.result : null))
            .catch(err => reject(err.response ? err.response.data.result : null));
    });
}

export function sendPicture(data: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        const body = { date: new Date().getTime(), data: data};
        axios.post<Message<boolean>>(url + '/api/camera/picture/' + encrypt(id, configuration.sharedKey), body)
            .then(body => resolve(body.data ? body.data.result : null))
            .catch(err => reject(err.response ? err.response.data.result : null));
    });
}
