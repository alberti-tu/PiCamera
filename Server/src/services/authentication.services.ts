import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Token } from '../models/http.models';
import { configuration } from '../config';

const secret: string = hash(new Date().getTime().toString());

export function encryptAES(data: string, key: string): string {
	key = crypto.createHash('sha256').update(key).digest('base64').substring(0, 32);

	const iv = crypto.randomBytes(16);
	const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);

	let encrypted = cipher.update(data);
	encrypted = Buffer.concat([encrypted, cipher.final()]);

	return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decryptAES(data: string, key: string): string {
	key = crypto.createHash('sha256').update(key).digest('base64').substring(0, 32);

	const iv = Buffer.from(data.split(':')[0], 'hex');
	const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);

	let decrypted = decipher.update(Buffer.from(data.split(':')[1], 'hex'));
	decrypted = Buffer.concat([decrypted, decipher.final()]);

	return decrypted.toString();
}

export function encodeToken(data: object): string {
	return jwt.sign(data, secret, { expiresIn: configuration.server.timeout });
}

export function decodeToken(token: string): Token {
	try {
		return JSON.parse(JSON.stringify(jwt.verify(token, secret)));
	} catch {
		return null
	}
}

export function hash(data: string): string {
	return crypto.createHash('sha256').update(data).digest('hex');
}
