import { Request, Response, NextFunction } from 'express';
import { HttpMessage, Message, Token } from '../models/http.models';
import { configuration } from '../config';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import * as database from './database.middlewares';

export async function login(req: Request<any>, res: Response<Message<string>>, next: NextFunction) {
    try {
        const user = await database.selectUser(req.body.username, req.body.password);

        if (user != null) {
            const token = jwt.sign(user, configuration.server.secret, { expiresIn: configuration.server.timeout });
            res.status(200).send({ code: 200, message: HttpMessage.Successful, result: token });
        } else {
            res.status(200).send({ code: 404, message: HttpMessage.NotFound, result: null });
        }
    } catch {
        res.status(400).send({ code: 400, message: HttpMessage.BadRequest, result: null });
    }
}

export async function verifyCameraToken(req: Request<any>, res: Response<Message<string>>, next: NextFunction) {
    try {
        const clientKey = req.headers.authorization;
        const serverKey = crypto.createHash('sha256').update(configuration.server.sharedKey).digest('hex');

        if (clientKey == serverKey) {
            next();
        } else {
            res.status(401).send({ code: 401, message: HttpMessage.Unauthorized, result: null });
        }
    } catch {
        res.status(401).send({ code: 401, message: HttpMessage.Unauthorized, result: null });
    }
}

export async function verifyUserToken(req: Request<any>, res: Response<Message<string>>, next: NextFunction) {
    try {
        const token: Token = JSON.parse(JSON.stringify(jwt.verify(req.headers.authorization, configuration.server.secret)));
        const result = await database.checkUser(token.id);

        if (result) {
            res.locals = { ...res.locals, id: token.id };
            next();
        } else {
            res.status(401).send({ code: 401, message: HttpMessage.Unauthorized, result: null });
        }
    } catch {
        res.status(401).send({ code: 401, message: HttpMessage.Unauthorized, result: null });
    }
}