import { Request, Response, NextFunction } from 'express';
import { configuration } from '../config';
import { HttpMessage, Message } from '../models/http.models';
import { File } from '../services/file.services';

export async function getFolderId(req: Request<any>, res: Response<Message<string[]>>, next: NextFunction) {
    try {

    } catch {
        res.status(400).send({ code: 400, message: HttpMessage.BadRequest, result: null });
    }
}

export async function savePicture(req: Request<any>, res: Response<Message<boolean>>, next: NextFunction) {
    try {
        const result = File.writeFile(configuration.server.directory + '/' + res.locals.cameraId, req.body.data, 'txt');

        if (result) {
            res.status(201).send({ code: 201, message: HttpMessage.NewItem, result: true });
        } else {
            res.status(200).send({ code: 204, message: HttpMessage.NoContent, result: false });
        }
    } catch {
        res.status(400).send({ code: 400, message: HttpMessage.BadRequest, result: null });
    }
}

export async function getPicture(req: Request<any>, res: Response<Message<string>>, next: NextFunction) {
    try {
        const data = File.readFile(configuration.server.directory + '/' + res.locals.cameraId, req.params.name, 'base64');

        if (data != null) {
            res.status(200).send({ code: 200, message: HttpMessage.Successful, result: data });
        } else {
            res.status(200).send({ code: 404, message: HttpMessage.NotFound, result: null });
        }
    } catch {
        res.status(400).send({ code: 400, message: HttpMessage.BadRequest, result: null });
    }
}

export async function removePicture(req: Request<any>, res: Response<Message<boolean>>, next: NextFunction) {
    try {
        const result = File.removeFile(configuration.server.directory + '/' + res.locals.cameraId, req.params.name);

        if (result) {
            res.status(201).send({ code: 201, message: HttpMessage.NewItem, result: true });
        } else {
            res.status(200).send({ code: 404, message: HttpMessage.NotFound, result: null });
        }
    } catch {
        res.status(400).send({ code: 400, message: HttpMessage.BadRequest, result: null });
    }
}
