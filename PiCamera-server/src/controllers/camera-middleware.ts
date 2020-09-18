import { Request, Response, NextFunction } from 'express';
import { Message } from '../models/http.model';
import { Camera } from '../services/camera';
import { configuration } from '../config';
import { PictureOptions } from '../models/options.model';

export async function cameraSettings(req: Request<any>, res: Response<Message<boolean>>, next: NextFunction) {
    try {
        const camera = Camera.getInstance(configuration.camera);
        const options: PictureOptions = req.body;

        camera.setPictureOptions(options);

        res.status(200).send({ code: 200, message: 'Successful', result: true });
    } catch {
        res.status(400).send({ code: 400, message: 'Bad Request', result: null });
    }
}