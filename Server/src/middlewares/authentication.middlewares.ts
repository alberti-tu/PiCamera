import { Request, Response, NextFunction } from 'express';
import { decodeToken, decryptAES, encodeToken } from '../services/authentication.services';
import { configuration } from '../config';

import * as database from './database.middlewares';

import { UserDTO } from '../models/database.models';

export async function login(req: Request<any>, res: Response<string>, next: NextFunction) {
	try {
		const user = await database.getUserId(req.body.username, req.body.password);

		if (user) {
			res.status(200).send(encodeToken(user));
		} else {
			res.status(401).send(null);
		}
	} catch {
		res.status(400).send(null);
	}
}

export async function selectOne(req: Request<any>, res: Response<UserDTO>, next: NextFunction) {
	try {
		const user = await database.selectUser(res.locals.userId);

		if (user) {
			delete user.id;
			res.status(200).send(user);
		} else {
			res.status(404).send(null);
		}
	} catch {
		res.status(400).send(null);
	}
}

export async function register(req: Request<any>, res: Response<boolean>, next: NextFunction) {
	try {
		const id = await database.insertUser(req.body.username, req.body.password);

		if (id) {
			res.status(201).send(true);
		} else {
			res.status(404).send(false);
		}
	} catch {
		res.status(400).send(null);
	}
}

export async function update(req: Request<any>, res: Response<boolean>, next: NextFunction) {
	try {
		const result = await database.updateUser({ ...req.body, id: res.locals.userId });

		if (result.affectedRows == 1) {
			res.status(200).send(true);
		} else {
			res.status(404).send(false);
		}
	} catch {
		res.status(400).send(null);
	}
}

export async function remove(req: Request<any>, res: Response<boolean>, next: NextFunction) {
	try {
		const result = await database.deleteUser(res.locals.userId);

		if (result.affectedRows == 1) {
			res.status(200).send(true);
		} else {
			res.status(404).send(false);
		}
	} catch {
		res.status(400).send(null);
	}
}

export async function getUserId(req: Request<any>, res: Response<any>, next: NextFunction) {
	try {
		const token = decodeToken(req.headers.authorization);
		const result = await database.checkUser(token.id);

		if (result) {
			res.locals.userId = token.id;
			next();
		} else {
			res.status(401).send(null);
		}
	} catch {
		res.status(400).send(null);
	}
}

export async function getCameraId(req: Request<any>, res: Response<any>, next: NextFunction) {
	try {
		res.locals.cameraId = req.params?.id;
		next();
	} catch {
		res.status(400).send(null);
	}
}

export async function decodeCameraId(req: Request<any>, res: Response<any>, next: NextFunction) {
	try {
		res.locals.cameraId = decryptAES(req.params?.id, configuration.server.sharedKey);
		next();
	} catch {
		res.status(400).send(null);
	}
}
