import { Request, Response, NextFunction } from 'express';
import { HttpMessage, Message } from '../models/http.models';

export async function getFolderId(req: Request<any>, res: Response<Message<string[]>>, next: NextFunction) {
    try {

    } catch {
        res.status(400).send({ code: 400, message: HttpMessage.BadRequest, result: null });
    }
}

export async function savePicture(req: Request<any>, res: Response<Message<boolean>>, next: NextFunction) {
    try {

    } catch {
        res.status(400).send({ code: 400, message: HttpMessage.BadRequest, result: null });
    }
}

export async function getPicture(req: Request<any>, res: Response<Message<string>>, next: NextFunction) {
    try {

    } catch {
        res.status(400).send({ code: 400, message: HttpMessage.BadRequest, result: null });
    }
}

export async function removePicture(req: Request<any>, res: Response<Message<boolean>>, next: NextFunction) {
    try {

    } catch {
        res.status(400).send({ code: 400, message: HttpMessage.BadRequest, result: null });
    }
}
