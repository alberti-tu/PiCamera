import mariadb from 'mariadb';
import { DatabaseOptions } from '../models/options.model';

export class Database {

    private static instance: Database = null;
    private configDB: DatabaseOptions; 

    constructor (config: DatabaseOptions) {
        config.database = config.database != null ? config.database : null;
        config.user = config.user != null ? config.user : 'root';
        config.password = config.password != null ? config.password : null;
        config.host = config.host != null ? config.host : 'localhost';
        config.port = config.port != null ? config.port : 3306;
        
        this.configDB = config;
    }

    public static getInstance(configuration: DatabaseOptions): Database {
        if (!Database.instance) {
            Database.instance = new Database(configuration);
        }
        return Database.instance;
    }

    public async checkDatabase(): Promise<boolean> {
        try {
            const connection = await mariadb.createConnection(this.configDB);
            await connection.query('USE ' + this.configDB.database);
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
                const connection = await mariadb.createConnection(this.configDB);
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
            const connection = await mariadb.createConnection({ ...this.configDB, database: null });

            // Creating database
            await connection.query('CREATE DATABASE ' + this.configDB.database);
            await connection.query('USE ' + this.configDB.database);

            for (let query of tables) {
                await connection.query(query);
            }

            await connection.end();

            console.log('Database created');
        } catch {
            const connection = await mariadb.createConnection(this.configDB);
            await connection.query('DROP DATABASE ' + this.configDB.database);
            await connection.end();

            console.log('Drop database ' + this.configDB.database);

            process.exit(1);
        }
    }
}