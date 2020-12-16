import { UserDTO } from '../models/database.models';
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
            "CREATE TABLE cameras (id VARCHAR(64) NOT NULL PRIMARY KEY, filter VARCHAR(64) NOT NULL DEFAULT '', quality DECIMAL(3) UNSIGNED NOT NULL DEFAULT 100, rotation DECIMAL(3) UNSIGNED NOT NULL DEFAULT 0)",
            "CREATE TABLE suscriptions (user_id VARCHAR(64) NOT NULL, camera_id VARCHAR(64) NOT NULL, CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE RESTRICT, CONSTRAINT fk_camera_id FOREIGN KEY (camera_id) REFERENCES cameras (id) ON DELETE CASCADE ON UPDATE RESTRICT)"
        ];

        await database.createDatabase(queries);

        const read = readline.createInterface({ input: process.stdin, output: process.stdout });

        console.log('\n+----- REGISTER ADMIN USER -----+\n');
        read.question('Username: ', async username => {
            read.question('Password: ', async password => {
                console.log('\n+--------------------------------+\n');

                const result = await insertUser(username, password);

                if (result.affectedRows == 1) {
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

export async function selectUser(username: string, password: string): Promise<UserDTO[]> {
    return await database.query<UserDTO[]>('SELECT id FROM users WHERE username = ? AND password = ?', [ username, password ]);
}

export async function checkUser(id: string): Promise<boolean> {
    const result = await database.query('SELECT COUNT(*) FROM users WHERE id = ?', [ id ]);
    return result[0]['COUNT(*)'] == 1 ? true : false;
}

export async function insertUser(username: string, password: string): Promise<StatusDatabase> {
    const idHash = crypto.createHash('sha256').update(new Date().getTime().toString()).digest('hex');
    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
    return await database.query<StatusDatabase>('INSERT INTO users VALUES (?,?,?)', [ idHash, username, passwordHash ]);
}

export async function deleteUser(id: string): Promise<StatusDatabase> {
    return await database.query<StatusDatabase>('DELETE FROM users WHERE id = ?', [ id ]);
}