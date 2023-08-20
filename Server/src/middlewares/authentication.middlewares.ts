import { Request, Response, NextFunction } from 'express';
import { HttpMessage, Message, Token } from '../models/http.models';
import { decodeToken, decryptAES, encodeToken } from '../services/authentication.services';
import { configuration } from '../config';

import * as database from './database.middlewares';

export async function login(req: Request<any>, res: Response<Message<string>>, next: NextFunction) {
	try {
		const user = await database.getUserId(req.body.username, req.body.password);

		if (user != null) {
			res.status(200).send({ code: 200, message: HttpMessage.Successful, result: encodeToken(user) });
		} else {
			res.status(200).send({ code: 404, message: HttpMessage.NotFound, result: null });
		}
	} catch {
		res.status(400).send({ code: 400, message: HttpMessage.BadRequest, result: null });
	}
}

export async function selectOne(req: Request<any>, res: Response<Message<any>>, next: NextFunction) {
	try {
		const user = await database.selectUser(res.locals.userId);

		if (!user) {
			delete user.id;
			res.status(200).send({ code: 200, message: HttpMessage.Successful, result: user });
		} else {
			res.status(200).send({ code: 404, message: HttpMessage.NotFound, result: null });
		}
	} catch {
		res.status(400).send({ code: 400, message: HttpMessage.BadRequest, result: null });
	}
}

export async function register(req: Request<any>, res: Response<Message<boolean>>, next: NextFunction) {
	try {
		const id: string = await database.insertUser(req.body.username, req.body.password);

		if (id) {
			res.status(201).send({ code: 201, message: HttpMessage.NewItem, result: true });
		} else {
			res.status(200).send({ code: 404, message: HttpMessage.NotFound, result: false });
		}
	} catch {
		res.status(400).send({ code: 400, message: HttpMessage.BadRequest, result: null });
	}
}

export async function update(req: Request<any>, res: Response<Message<boolean>>, next: NextFunction) {
	try {
		req.body.id = res.locals.userId;
		const result = await database.updateUser(req.body);

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
		const result = await database.deleteUser(res.locals.userId);

		if (result.affectedRows == 1) {
			res.status(200).send({ code: 200, message: HttpMessage.Successful, result: true });
		} else {
			res.status(204).send({ code: 204, message: HttpMessage.NoContent, result: false });
		}
	} catch {
		res.status(400).send({ code: 400, message: HttpMessage.BadRequest, result: null });
	}
}

export async function getUserId(req: Request<any>, res: Response<Message<any>>, next: NextFunction) {
	try {
		const token = decodeToken(req.headers.authorization);
		const result = await database.checkUser(token.id);

		if (result) {
			res.locals.userId = token.id;
			next();
		} else {
			res.status(401).send({ code: 401, message: HttpMessage.Unauthorized, result: null });
		}
	} catch {
		res.status(401).send({ code: 401, message: HttpMessage.Unauthorized, result: null });
	}
}

export async function getCameraId(req: Request<any>, res: Response<Message<any>>, next: NextFunction) {
	try {
		res.locals.cameraId = req.params?.id;
		next();
	} catch {
		res.status(400).send({ code: 400, message: HttpMessage.BadRequest, result: null });
	}
}

export async function decodeCameraId(req: Request<any>, res: Response<Message<any>>, next: NextFunction) {
	try {
		res.locals.cameraId = decryptAES(res.locals.cameraId, configuration.server.sharedKey);
		next();
	} catch {
		res.status(401).send({ code: 400, message: HttpMessage.Successful, result: null });
	}
}
