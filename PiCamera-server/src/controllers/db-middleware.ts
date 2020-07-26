import { StatusDatabase, UserDatabase } from '../models/database.model';
import { Database } from '../services/database-service';
import { configuration } from '../config';
import readline from 'readline';
import crypto from 'crypto';

const database = new Database(configuration.mariaDB);

export async function init() {
    const result: boolean = await database.checkDatabase();

    if (!result) {
        const queries: string[] = [
            'CREATE TABLE users (id VARCHAR(64) NOT NULL UNIQUE, username VARCHAR(128) PRIMARY KEY, password VARCHAR(64) NOT NULL)'
        ];
        await database.createDatabase(queries);

        const read = readline.createInterface({ input: process.stdin, output: process.stdout });
        
        console.log('\n+----- REGISTER ADMIN USER -----+\n');
        read.question('Username: ', async username => {
            read.question('Password: ', async password => {
                console.log('\n+--------------------------------+\n');

                const result = await insertUserAdmin(username, password);
                
                if (result.affectedRows === 1) {
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

export async function selectUserAdmin(username: string, password: string): Promise<UserDatabase[]> {
    return await database.query('SELECT id FROM users WHERE username = ? AND password = ?', [ username, password ]);
}

export async function verifyAdmin(id: string): Promise<boolean> {
    const result = await database.query('SELECT COUNT(*) FROM users WHERE id = ?', [ id ]);
    return result[0]['COUNT(*)'] === 1 ? true : false;
}

export async function insertUserAdmin(username: string, password: string): Promise<StatusDatabase> {
    const idHash = crypto.createHash('sha256').update(new Date().getTime().toString()).digest('hex');
    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
    return await database.query('INSERT INTO users VALUES (?,?,?)', [ idHash, username, passwordHash ]);
}

export async function deleteUserAdmin(id: string): Promise<StatusDatabase> {
    return await database.query('DELETE FROM users WHERE id = ?', [ id ]);
}