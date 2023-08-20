import { CameraDTO, FilterDTO, SubscriptionDTO, UserDTO } from '../models/database.models';
import { Database, StatusDatabase } from '../services/database.services';
import { configuration } from '../config';
import crypto from 'crypto';
import fs from 'fs'

const database = Database.getInstance(configuration.database);

export async function init() {
	try {
		const isCreated = await database.checkDatabase();

		if (!isCreated) {
			fs.readFile('src/database.sql', 'utf-8', (error, data) => {
				if (error) {
				  console.error(error);
				  return;
				}

				const queries = data?.split('\n')?.filter(item => item?.trim() !== '');

				database.createDatabase(queries);
			})
		}
	}
	catch {
		console.log('\nERROR Database: Connection refuse');
		console.log('From the project root directory');
		console.log('Execute: npm run server:config');
		process.exit(1);
	}
}

// TABLE USERS

export async function checkUser(id: string): Promise<boolean> {
	const result = await database.query('SELECT COUNT(*) FROM users WHERE id = ?', [id]);
	return result[0]['COUNT(*)'] == 1 ? true : false;
}

export async function getUserId(username: string, password: string): Promise<UserDTO> {
	const users = await database.query<UserDTO[]>('SELECT id FROM users WHERE username = ? AND password = ? LIMIT 1', [username, password]);
	return users != null ? users[0] : null;
}

export async function selectUser(id: string): Promise<UserDTO> {
	const users = await database.query<UserDTO[]>('SELECT * FROM users WHERE id = ? LIMIT 1', [id]);
	return users != null ? users[0] : null;
}

export async function insertUser(username: string, password: string): Promise<string> {
	try {
		const id = crypto.createHash('sha256').update(new Date().getTime().toString()).digest('hex');
		password = crypto.createHash('sha256').update(password).digest('hex');
		await database.query<StatusDatabase>('INSERT INTO users VALUES (?,?,?)', [id, username, password]);
		return id;
	} catch {
		return null;
	}
}

export async function updateUser(user: UserDTO) {
	user.password = crypto.createHash('sha256').update(user.password).digest('hex');
	return await database.query<StatusDatabase>('UPDATE users SET username = ?, password = ? WHERE id = ?', [user.username, user.password, user.id]);
}

export async function deleteUser(id: string): Promise<StatusDatabase> {
	return await database.query<StatusDatabase>('DELETE FROM users WHERE id = ?', [id]);
}

// TABLE CAMERAS

export async function selectCamera(id: string): Promise<CameraDTO> {
	const cameras = await database.query<CameraDTO[]>('SELECT * FROM cameras WHERE id = ? LIMIT 1', [id]);
	return cameras != null ? cameras[0] : null;
}

export async function insertCamera(id: string): Promise<StatusDatabase> {
	return await database.query<StatusDatabase>('INSERT INTO cameras (id, timestamp) VALUES (?, NOW())', [id]);
}

export async function updateCamera(camera: CameraDTO): Promise<StatusDatabase> {
	return await database.query<StatusDatabase>('UPDATE cameras SET filter = ?, quality = ?, rotation = ?, timestamp = NOW() WHERE id = ?', [camera.filter, camera.quality, camera.rotation, camera.id]);
}

export async function deleteCamera(id: string): Promise<StatusDatabase> {
	return await database.query<StatusDatabase>('DELETE FROM cameras WHERE id = ?', [id]);
}

// TABLE - subscriptions

export async function selectAllSubscriptions(userId: string): Promise<SubscriptionDTO[]> {
	return await database.query<SubscriptionDTO[]>('SELECT * FROM subscriptions WHERE user_id = ? ORDER BY name ASC', [userId]);
}

export async function selectOneSubscription(userId: string, cameraId: string): Promise<SubscriptionDTO> {
	const subscriptions = await database.query<SubscriptionDTO>('SELECT * FROM subscriptions WHERE user_id = ? AND camera_id = ? LIMIT 1', [userId, cameraId]);
	return subscriptions != null ? subscriptions[0] : null;
}

export async function insertSubscriptions(userId: string, cameraId: string): Promise<string> {
	try {
		const id = crypto.createHash('sha256').update(userId + cameraId).digest('hex');
		const name = 'camera-' + cameraId;
		await database.query<StatusDatabase>('INSERT INTO subscriptions VALUES (?, ?, ?, ?)', [id, name, userId, cameraId]);
		return id;
	} catch {
		return null;
	}
}

export async function updateSubscriptions(subscription: SubscriptionDTO): Promise<StatusDatabase> {
	return await database.query<StatusDatabase>('UPDATE subscriptions SET name = ? WHERE id = ?', [subscription.name, subscription.id]);
}

export async function deleteSubscriptions(id: string): Promise<StatusDatabase> {
	return await database.query<StatusDatabase>('DELETE FROM subscriptions WHERE id = ?', [id]);
}

// TABLES - filters

export async function selectFilters(): Promise<FilterDTO[]> {
	return await database.query<FilterDTO[]>('SELECT * FROM filters');
}
