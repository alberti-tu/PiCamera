export interface Response<T> {
    code: number; 
    message: string;
    result: T;
}