import { Request, Response, NextFunction } from 'express';
import { configuration } from '../config';
import { HttpMessage, Message } from '../models/http.model';
import * as jwt from 'jsonwebtoken';
import * as database from './db-middleware';

export async function login(req: Request<any>, res: Response<Message<string>>, next: NextFunction) {
    try {
        const result = await database.selectUserAdmin(req.body.username, req.body.password);
        
        if (result.length == 1) {
            const token = jwt.sign(result[0], configuration.server.secret, { expiresIn: configuration.server.timeout });
            res.status(200).send({ code: 200, message: HttpMessage.Successful, result: token });
        } else {
            res.status(200).send({ code: 404, message: HttpMessage.NotFound, result: null });
        }
    } catch {
        res.status(400).send({ code: 400, message: HttpMessage.BadRequest, result: null });
    }
}

export async function verifyToken(req: Request<any>, res: Response<Message<string>>, next: NextFunction) {
    try {
        const token: { id: string, iat: number, exp: number } = JSON.parse(JSON.stringify(jwt.verify(req.headers.authorization, configuration.server.secret)));
        const result = await database.verifyAdmin(token.id);

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

export async function registerAdmin(req: Request<any>, res: Response<Message<boolean>>, next: NextFunction) {
    try {
        await database.insertUserAdmin(req.body.username, req.body.password);
        res.status(201).send({ code: 201, message: HttpMessage.NewItem, result: true });
    } catch {
        res.status(400).send({ code: 400, message: HttpMessage.BadRequest, result: false });
    }
}

export async function deleteAdmin(req: Request<any>, res: Response<Message<boolean>>, next: NextFunction) {
    try {
        const result = await database.deleteUserAdmin(req.query.id.toString());

        if (result.affectedRows == 1) {
            res.status(200).send({ code: 200, message: HttpMessage.Successful, result: true });
        } else {
            res.status(200).send({ code: 404, message: HttpMessage.NotFound, result: false });
        }
    } catch {
        res.status(400).send({ code: 400, message: HttpMessage.BadRequest, result: false });
    }
}
