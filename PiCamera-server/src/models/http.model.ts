export interface Message<T> {
    code: number; 
    message: HttpMessage;
    result: T;
}

export enum HttpMessage {
    Successful = 'Successful',      // code: 200
    NewItem = 'Inserted new item',  // code: 201
    BadRequest = 'Bad request',     // code: 400
    Unauthorized = 'Unauthorized',  // code: 401
    NotFound = 'Not found'          // code: 404
}
