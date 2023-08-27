import { Request, Response, NextFunction } from 'express';
import { CameraSubscription } from '../models/database.models';
import { setSubscriptionList } from './socket.middlewares';

import * as database from './database.middlewares';

export async function selectAll(req: Request<any>, res: Response<CameraSubscription[]>, next: NextFunction) {
	try {
		const subscriptions = await database.selectAllSubscriptions(res.locals.userId);
		subscriptions.forEach(item => delete item.user_id);
		res.status(200).send(subscriptions);
	} catch {
		res.status(400).send(null);
	}
}

export async function selectOne(req: Request<any>, res: Response<CameraSubscription>, next: NextFunction) {
	try {
		const subscription = await database.selectOneSubscription(res.locals.userId, res.locals.cameraId);
		delete subscription.user_id;
		res.status(200).send(subscription);
	} catch {
		res.status(400).send(null);
	}
}

export async function insert(req: Request<any>, res: Response<boolean>, next: NextFunction) {
	try {
		const result = await database.insertSubscriptions(res.locals.userId, res.locals.cameraId);
		setSubscriptionList(res.locals.userId);

		if (result) {
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
		const result = await database.updateSubscriptions(req.body);

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
		const result = await database.deleteSubscriptions(req.params.subscription);
		setSubscriptionList(res.locals.userId);

		if (result.affectedRows == 1) {
			res.status(200).send(true);
		} else {
			res.status(404).send(false);
		}
	} catch {
		res.status(400).send(null);
	}
}