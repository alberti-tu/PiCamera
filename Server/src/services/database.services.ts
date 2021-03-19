import mariadb from 'mariadb';

export interface DatabaseOptions {
    database: string;
    user: string;
    password: string;
    host: string;
    port: number;
}

export interface StatusDatabase {
    affectedRows: number;
    insertId: number;
    warningStatus: number;
}

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

    public query<T>(sql: string, params: any[] = null): Promise<T> {
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

    public async createDatabase(tables: string[]): Promise<void> {
        try {
            const connection = await mariadb.createConnection({ ...this.databaseOptions, database: null });

            await connection.query('CREATE DATABASE ' + this.databaseOptions.database);
            console.log('Database created');
            await connection.query('USE ' + this.databaseOptions.database);

            for (const query of tables) {
                await connection.query(query)
            }

            await connection.end();
        } catch {
            const connection = await mariadb.createConnection(this.databaseOptions);

            await connection.query('DROP DATABASE ' + this.databaseOptions.database);
            console.log('Drop database ' + this.databaseOptions.database);
            await connection.end();

            process.exit(1);
        }
    }
}