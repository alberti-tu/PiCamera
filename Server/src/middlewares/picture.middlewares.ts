import { Request, Response, NextFunction } from 'express';
import { configuration } from '../config';
import { File } from '../services/file.services';

export async function getFolderId(req: Request<any>, res: Response<string[]>, next: NextFunction) {
	try {
		try {
			const page = parseInt(req.query.page.toString());
			const size = parseInt(req.query.size.toString());

			const files = File.readDirectory(configuration.server.directory + '/' + res.locals.cameraId, page, size);
			res.status(200).send(files);
		} catch {
			const files = File.readDirectory(configuration.server.directory + '/' + res.locals.cameraId);
			res.status(200).send(files);
		}
	} catch {
		res.status(400).send(null);
	}
}

export async function savePicture(req: Request<any>, res: Response<boolean>, next: NextFunction) {
	try {
		const result = File.writeFile(configuration.server.directory + '/' + res.locals.cameraId, req.body.data, 'jpg');

		if (result) {
			res.status(201).send(true);
		} else {
			res.status(404).send(false);
		}
	} catch {
		res.status(400).send(null);
	}
}

export async function getPicture(req: Request<any>, res: Response<string>, next: NextFunction) {
	try {
		const data = File.readFile(configuration.server.directory + '/' + res.locals.cameraId, req.params.name, 'base64');

		if (data) {
			res.status(200).send(data);
		} else {
			res.status(404).send(null);
		}
	} catch {
		res.status(400).send(null);
	}
}

export async function removePicture(req: Request<any>, res: Response<boolean>, next: NextFunction) {
	try {
		const result = File.removeFile(configuration.server.directory + '/' + res.locals.cameraId, req.params.name);

		if (result) {
			res.status(200).send(true);
		} else {
			res.status(404).send(null);
		}
	} catch {
		res.status(400).send(null);
	}
}
