import mariadb from 'mariadb';
import { DatabaseOptions } from '../models/options.model';

export class Database {

    private static instance: Database = null;
    private databaseOptions: DatabaseOptions; 

    constructor (options: DatabaseOptions) {
        this.databaseOptions = {
            database: options.database != null ? options.database : null,
            user: options.user != null ? options.user : 'root',
            password: options.password != null ? options.password : null,
            host: options.host != null ? options.host : 'localhost',
            port: options.port != null ? options.port : 3306,
        };
    }

    public static getInstance(options: DatabaseOptions): Database {
        if (!Database.instance) {
            Database.instance = new Database(options);
        }
        return Database.instance;
    }

    public async checkDatabase(): Promise<boolean> {
        try {
            const connection = await mariadb.createConnection(this.databaseOptions);
            await connection.query('USE ' + this.databaseOptions.database);
            await connection.end();
            console.log('Database connected');
            return true;
        } catch {
            return false;
        }
    }

    public query(sql: string, params: any[] = null): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await mariadb.createConnection(this.databaseOptions);
                const result = await connection.query(sql, params);
                await connection.end();
    
                resolve(result);
            } catch {
                reject(new Error('Database error'));
            }
        });
    }

    public async createDatabase(tables : string[]): Promise<void> {
        try {
            const connection = await mariadb.createConnection({ ...this.databaseOptions, database: null });

            // Creating database
            await connection.query('CREATE DATABASE ' + this.databaseOptions.database);
            await connection.query('USE ' + this.databaseOptions.database);

            for (let query of tables) {
                await connection.query(query);
            }

            await connection.end();

            console.log('Database created');
        } catch {
            const connection = await mariadb.createConnection(this.databaseOptions);
            await connection.query('DROP DATABASE ' + this.databaseOptions.database);
            await connection.end();

            console.log('Drop database ' + this.databaseOptions.database);

            process.exit(1);
        }
    }

}
