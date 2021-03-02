export interface Message<T> {
    code: number;
    message: string;
    result: T;
}
