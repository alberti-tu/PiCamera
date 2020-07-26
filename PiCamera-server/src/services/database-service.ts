import mariadb from 'mariadb';

export interface ConfigurationDB {
    database: string;
    user?: string;
    password?: string;
    host?: string;
    port?: number;
}

export class Database {

    private configDB: ConfigurationDB; 

    constructor (config: ConfigurationDB) {
        config.database = config.database !== undefined ? config.database : null;
        config.user = config.user !== undefined ? config.user : 'root';
        config.password = config.password !== undefined ? config.password : null;
        config.host = config.host !== undefined ? config.host : 'localhost';
        config.port = config.port !== undefined ? config.port : 3306;
        
        this.configDB = config;
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