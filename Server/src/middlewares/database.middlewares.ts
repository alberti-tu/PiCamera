import { UserDatabase } from '../models/database.models';
import { Database, StatusDatabase } from '../services/database.services';
import { configuration } from '../config';
import readline from 'readline';
import crypto from 'crypto';

const database = Database.getInstance(configuration.database);

export async function init() {
    const isCreated: boolean = await database.checkDatabase();

    if (!isCreated) {
        const queries: string[] = [
            'CREATE TABLE users (id VARCHAR(64) NOT NULL UNIQUE, username VARCHAR(128) PRIMARY KEY, password VARCHAR(64) NOT NULL)'
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

export async function selectUser(username: string, password: string): Promise<UserDatabase[]> {
    return await database.query<UserDatabase[]>('SELECT id FROM users WHERE username = ? AND password = ?', [ username, password ]);
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