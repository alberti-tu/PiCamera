import axios from 'axios';
import getSerialNumber from './utils.services';
import { configuration } from '../config';
import { encrypt } from './authentication.services';
import { CameraDTO, Message } from '../models/http.models';

const id = getSerialNumber();

export function setup(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        axios.get<Message<boolean>>(configuration.host + '/api/camera/' + encrypt(id, configuration.sharedKey))
            .then(body => resolve(body.data.result))
            .catch(err => reject(err.response.data.result));
    });
}

export function register(): Promise<any> {
    return new Promise<CameraDTO>((resolve, reject) => {
        axios.post<Message<CameraDTO>>(configuration.host + '/api/camera/' + encrypt(id, configuration.sharedKey))
            .then(body => resolve(body.data.result))
            .catch(err => reject(err.response.data.result));
    });
}

export function remove(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        axios.delete<Message<boolean>>(configuration.host + '/api/camera/' + encrypt(id, configuration.sharedKey))
            .then(body => resolve(body.data.result))
            .catch(err => reject(err.response.data.result));
    });
}
