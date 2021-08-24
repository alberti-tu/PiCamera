import { Request, Response, NextFunction } from 'express';
import { CameraOptions } from '../models/database.models';
import { HttpMessage, Message } from '../models/http.models';
import { setStream } from './socket.middlewares';
import { filters } from '../config';

import * as database from './database.middlewares';

export async function selectOne(req: Request<any>, res: Response<Message<CameraOptions>>, next: NextFunction) {
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

export async function insert(req: Request<any>, res: Response<Message<boolean>>, next: NextFunction) {
	try {
		const result = await database.insertCamera(res.locals.cameraId);

		if (result.affectedRows == 1) {
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
		req.body.id = res.locals.cameraId;
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
		setStream(res.locals.cameraId, req.body.data);

		const camera = await database.selectCamera(res.locals.cameraId);
		const hasChanges: boolean = req.body.timestamp != camera.timestamp;

		res.status(200).send({ code: 200, message: HttpMessage.Successful, result: hasChanges });
	} catch {
		res.status(400).send({ code: 400, message: HttpMessage.BadRequest, result: null });
	}
}

export async function filtersList(req: Request<any>, res: Response<Message<string[]>>, next: NextFunction) {
	try {
		res.status(200).send({ code: 200, message: HttpMessage.Successful, result: filters });
	} catch {
		res.status(400).send({ code: 400, message: HttpMessage.BadRequest, result: null });
	}
}
