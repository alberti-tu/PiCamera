import { Request, Response, NextFunction } from 'express';
import { CameraDTO } from '../models/database.models';
import { HttpMessage, Message } from '../models/http.models';

import * as database from './database.middlewares';

export async function register(req: Request<any>, res: Response<Message<boolean>>, next: NextFunction) {
    try {
        const result = await database.insertCamera(req.params.id);

        if (result.affectedRows == 1) {
            res.status(201).send({ code: 200, message: HttpMessage.NewItem, result: true });
        } else {
            res.status(204).send({ code: 404, message: HttpMessage.NoContent, result: false });
        }
    } catch {
        res.status(400).send({ code: 400, message: HttpMessage.BadRequest, result: null });
    }
}

export async function setup(req: Request<any>, res: Response<Message<CameraDTO>>, next: NextFunction) {
    try {
        const camera = await database.selectCamera(req.params.id);

        if (camera != null) {
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
        const result = await database.deleteCamera(req.params.id);

        if (result.affectedRows == 1) {
            res.status(200).send({ code: 200, message: HttpMessage.Successful, result: true });
        } else {
            res.status(204).send({ code: 204, message: HttpMessage.NoContent, result: false });
        }
    } catch {
        res.status(400).send({ code: 400, message: HttpMessage.BadRequest, result: null });
    }
}
