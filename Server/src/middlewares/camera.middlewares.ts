import { Request, Response, NextFunction } from 'express';
import { PictureOptions } from '../models/database.models';
import { HttpMessage, Message } from '../models/http.models';

import * as database from './database.middlewares';

export async function register(req: Request<any>, res: Response<Message<boolean>>, next: NextFunction) {
    try {
        const result = await database.insertCamera(res.locals.cameraId);

        if (result.affectedRows == 1) {
            res.status(201).send({ code: 200, message: HttpMessage.NewItem, result: true });
        } else {
            res.status(204).send({ code: 404, message: HttpMessage.NoContent, result: false });
        }
    } catch {
        res.status(400).send({ code: 400, message: HttpMessage.BadRequest, result: null });
    }
}

export async function setup(req: Request<any>, res: Response<Message<PictureOptions>>, next: NextFunction) {
    try {
        const camera = await database.selectCamera(res.locals.cameraId);

        if (camera != null) {
            delete camera.id;
            res.status(200).send({ code: 200, message: HttpMessage.Successful, result: camera });
        } else {
            res.status(404).send({ code: 404, message: HttpMessage.NotFound, result: null });
        }
    } catch {
        res.status(400).send({ code: 400, message: HttpMessage.BadRequest, result: null });
    }
}

export async function update(req: Request<any>, res: Response<Message<boolean>>, next: NextFunction) {
    try {
        const result = await database.updateCamera(req.body);

        if (result.affectedRows == 1) {
            res.status(200).send({ code: 200, message: HttpMessage.Successful, result: true });
        } else {
            res.status(204).send({ code: 204, message: HttpMessage.NoContent, result: false });
        }
    } catch {
        res.status(400).send({ code: 400, message: HttpMessage.BadRequest, result: null });
    }
}

export async function remove(req: Request<any>, res: Response<Message<boolean>>, next: NextFunction) {
    try {
        const result = await database.deleteCamera(res.locals.cameraId);

        if (result.affectedRows == 1) {
            res.status(200).send({ code: 200, message: HttpMessage.Successful, result: true });
        } else {
            res.status(204).send({ code: 204, message: HttpMessage.NoContent, result: false });
        }
    } catch {
        res.status(400).send({ code: 400, message: HttpMessage.BadRequest, result: null });
    }
}

export async function picture(req: Request<any>, res: Response<Message<boolean>>, next: NextFunction) {
    try {
        res.status(200).send({ code: 200, message: HttpMessage.Successful, result: false });
    } catch {
        res.status(400).send({ code: 400, message: HttpMessage.BadRequest, result: null });
    }
}