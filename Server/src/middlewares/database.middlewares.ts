import { CameraDTO, SubscriptionDTO, UserDTO } from '../models/database.models';
import { Database, StatusDatabase } from '../services/database.services';
import { configuration } from '../config';
import readline from 'readline';
import crypto from 'crypto';

const database = Database.getInstance(configuration.database);

export async function init() {
    const isCreated: boolean = await database.checkDatabase();

    if (!isCreated) {
        const queries: string[] = [
            "CREATE TABLE users (id VARCHAR(64) NOT NULL PRIMARY KEY, username VARCHAR(64) NOT NULL UNIQUE, password VARCHAR(64) NOT NULL)",
            "CREATE TABLE cameras (id VARCHAR(6) NOT NULL PRIMARY KEY, filter VARCHAR(64) NOT NULL DEFAULT '', quality DECIMAL(3) UNSIGNED NOT NULL DEFAULT 100, rotation DECIMAL(3) UNSIGNED NOT NULL DEFAULT 0)",
            "CREATE TABLE subscriptions (id VARCHAR(64) NOT NULL PRIMARY KEY, name VARCHAR(64) NOT NULL, user_id VARCHAR(64) NOT NULL, camera_id VARCHAR(6) NOT NULL, CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE RESTRICT, CONSTRAINT fk_camera_id FOREIGN KEY (camera_id) REFERENCES cameras (id) ON DELETE CASCADE ON UPDATE RESTRICT)"
        ];

        await database.createDatabase(queries);

        const read = readline.createInterface({ input: process.stdin, output: process.stdout });

        console.log('\n+----- REGISTER ADMIN USER -----+\n');
        read.question('Username: ', async username => {
            read.question('Password: ', async password => {
                console.log('\n+--------------------------------+\n');

                const result = await insertUser(username, password);

                if (result != null) {
                    console.log('User added to database\n');
                } else {
                    console.log('Error: User not added\n');
                    process.exit(2);
                }

                read.close();
            });
        });
    }
}

// TABLE USERS

export async function checkUser(id: string): Promise<boolean> {
    const result = await database.query('SELECT COUNT(*) FROM users WHERE id = ?', [ id ]);
    return result[0]['COUNT(*)'] == 1 ? true : false;
}

export async function selectUser(username: string, password: string): Promise<UserDTO> {
    const users = await database.query<UserDTO[]>('SELECT id FROM users WHERE username = ? AND password = ? LIMIT 1', [ username, password ]);
    return users != null ? users[0] : null;
}

export async function insertUser(username: string, password: string): Promise<string> {
    try {
        const id = crypto.createHash('sha256').update(new Date().getTime().toString()).digest('hex');
        const hash = crypto.createHash('sha256').update(password).digest('hex');
        await database.query<StatusDatabase>('INSERT INTO users VALUES (?,?,?)', [ id, username, hash ]);
        return id;
    } catch {
        return null;
    }
}

export async function updateUser(id: string, username: string, password: string) {
    return await database.query<StatusDatabase>('UPDATE users SET username = ?, password = ? WHERE id = ?', [username, password, id]);
}

export async function deleteUser(id: string): Promise<StatusDatabase> {
    return await database.query<StatusDatabase>('DELETE FROM users WHERE id = ?', [ id ]);
}

// TABLE CAMERAS

export async function selectCamera(id: string): Promise<CameraDTO> {
    const cameras = await database.query<CameraDTO[]>('SELECT * FROM cameras WHERE id = ? LIMIT 1', [ id ]);
    return cameras != null ? cameras[0] : null;
}

export async function insertCamera(id: string): Promise<StatusDatabase> {
    return await database.query<StatusDatabase>('INSERT INTO cameras (id) VALUES (?)', [ id ]);
}

export async function updateCamera(camera: CameraDTO): Promise<StatusDatabase> {
    return await database.query<StatusDatabase>('UPDATE cameras SET filter = ?, quality = ?, rotation = ?  WHERE id = ?', [camera.filter, camera.quality, camera.rotation, camera.id]);
}

export async function deleteCamera(id: string): Promise<StatusDatabase> {
    return await database.query<StatusDatabase>('DELETE FROM cameras WHERE id = ?', [ id ]);
}

// TABLE - subscriptions

export async function selectAllSubscriptions(userId: string): Promise<SubscriptionDTO[]> {
    return await database.query<SubscriptionDTO[]>('SELECT * FROM subscriptions WHERE user_id = ?', [ userId ]);
}

export async function selectOneSubscription(userId: string, cameraId: string) {
    const subscriptions = await database.query<SubscriptionDTO>('SELECT * FROM subscriptions WHERE user_id = ? AND camera_id = ? LIMIT 1', [ userId, cameraId ]);
    return subscriptions != null ? subscriptions[0] : null;
}
export async function insertSubscriptions(userId: string, cameraId: string): Promise<string> {
    try {
        const id = crypto.createHash('sha256').update(userId + cameraId).digest('hex');
        const name = 'camera-' + cameraId;
        await database.query<StatusDatabase>('INSERT INTO subscriptions VALUES (?, ?, ?, ?)', [ id, name, userId, cameraId ]);
        return id;
    } catch {
        return null;
    }
}

export async function updateSubscriptions(id: string, name: string): Promise<StatusDatabase> {
    return await database.query<StatusDatabase>('UPDATE subscriptions SET name = ? WHERE id = ?', [ name, id ]);
}

export async function deleteSubscriptions(id: string): Promise<StatusDatabase> {
    return await database.query<StatusDatabase>('DELETE FROM subscriptions WHERE id = ?', [ id ]);
}