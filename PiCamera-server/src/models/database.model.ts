export interface StatusDatabase {
    affectedRows: number; 
    insertId: number;
    warningStatus: number;
}

export interface UserDatabase {
    id: number;
    username: string;
    password: string;
}
