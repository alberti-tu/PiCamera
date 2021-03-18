import { Request, Response, NextFunction } from 'express';
import { CameraSubscription } from '../models/database.models';
import { HttpMessage, Message } from '../models/http.models';
import { setSubscriptionList } from './socket.middlewares';

import * as database from './database.middlewares';

export async function selectAll(req: Request<any>, res: Response<Message<CameraSubscription[]>>, next: NextFunction) {
    try {
        const subscriptions = await database.selectAllSubscriptions(res.locals.userId);
        subscriptions.forEach(item => delete item.user_id);
        res.status(200).send({ code: 200, message: HttpMessage.Successful, result: subscriptions });
    } catch {
        res.status(400).send({ code: 400, message: HttpMessage.BadRequest, result: null });
    }
}

export async function selectOne(req: Request<any>, res: Response<Message<CameraSubscription>>, next: NextFunction) {
    try {
        const subscription = await database.selectOneSubscription(res.locals.userId, res.locals.cameraId);
        delete subscription.user_id;
        res.status(200).send({ code: 200, message: HttpMessage.Successful, result: subscription });
    } catch {
        res.status(400).send({ code: 400, message: HttpMessage.BadRequest, result: null });
    }
}

export async function insert(req: Request<any>, res: Response<Message<boolean>>, next: NextFunction) {
    try {
        const result = await database.insertSubscriptions(res.locals.userId, req.params.id);
        setSubscriptionList(res.locals.userId);

        if (result != null) {
            res.status(201).send({ code: 201, message: HttpMessage.NewItem, result: true });
        } else {
            res.status(204).send({ code: 404, message: HttpMessage.NoContent, result: false });
        }
    } catch {
        res.status(400).send({ code: 400, message: HttpMessage.BadRequest, result: null });
    }
}

export async function update(req: Request<any>, res: Response<Message<boolean>>, next: NextFunction) {
    try {
        const result = await database.updateSubscriptions(req.body.id, req.body.name);

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
        const result = await database.deleteSubscriptions(req.params.id);
        setSubscriptionList(res.locals.userId);

        if (result.affectedRows == 1) {
            res.status(200).send({ code: 200, message: HttpMessage.Successful, result: true });
        } else {
            res.status(204).send({ code: 204, message: HttpMessage.NoContent, result: false });
        }
    } catch {
        res.status(400).send({ code: 400, message: HttpMessage.BadRequest, result: null });
    }
}