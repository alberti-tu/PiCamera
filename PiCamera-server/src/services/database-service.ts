import mariadb from 'mariadb';
import { DatabaseOptions } from '../models/options.model';

export class Database {

    private static instance: Database = null;
    private databaseOptions: DatabaseOptions; 

    constructor (options: DatabaseOptions) {
        options.name = options.name != null ? options.name : null;
        options.user = options.user != null ? options.user : 'root';
        options.password = options.password != null ? options.password : null;
        options.host = options.host != null ? options.host : 'localhost';
        options.port = options.port != null ? options.port : 3306;
        
        this.databaseOptions = options;
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
            await connection.query('USE ' + this.databaseOptions.name);
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
            await connection.query('CREATE DATABASE ' + this.databaseOptions.name);
            await connection.query('USE ' + this.databaseOptions.name);

            for (let query of tables) {
                await connection.query(query);
            }

            await connection.end();

            console.log('Database created');
        } catch {
            const connection = await mariadb.createConnection(this.databaseOptions);
            await connection.query('DROP DATABASE ' + this.databaseOptions.name);
            await connection.end();

            console.log('Drop database ' + this.databaseOptions.name);

            process.exit(1);
        }
    }
}