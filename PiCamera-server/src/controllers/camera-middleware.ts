import { Request, Response, NextFunction } from 'express';
import { Message } from '../models/http.model';
import { File } from '../services/file-service';
import { Camera } from '../services/camera-service';
import { CameraOptions, PictureOptions } from '../models/options.model';
import { configuration } from '../config';

export async function savePicture(req: Request<any>, res: Response<Message<string>>, next: NextFunction) {
    try {
        Camera.getInstance(configuration.camera).savePicture();
        res.status(200).send({ code: 200, message: 'Successful', result: null });
    } catch {
        res.status(400).send({ code: 400, message: 'Bad Request', result: null });
    }
}

export async function getPictureDirectory(req: Request<any>, res: Response<Message<any>>, next: NextFunction) {
    try {
        const options: CameraOptions = Camera.getInstance(configuration.camera).getCameraOptions();
        const files: string[] = await File.readDirectory(options.directory, parseInt(req.query.page.toString()), parseInt(req.query.size.toString()));
        res.status(200).send({ code: 200, message: 'Successful', result: files });
    } catch {
        res.status(400).send({ code: 400, message: 'Bad Request', result: null });
    }
}

export async function getPictureDirectoryCount(req: Request<any>, res: Response<Message<number>>, next: NextFunction) {
    try {
        const options: CameraOptions = Camera.getInstance(configuration.camera).getCameraOptions();
        const files: string[] = await File.readDirectory(options.directory);
        res.status(200).send({ code: 200, message: 'Successful', result: files.length });
    } catch {
        res.status(400).send({ code: 400, message: 'Bad Request', result: null });
    }
}

export async function getPictureFile(req: Request<any>, res: Response<Message<any>>, next: NextFunction) {
    res.status(200).send({ code: 200, message: 'Successful', result: req });
}

export async function getCameraSettings(req: Request<any>, res: Response<Message<PictureOptions>>, next: NextFunction) {
    try {
        const settins: PictureOptions = Camera.getInstance(configuration.camera).getPictureOptions();
        res.status(200).send({ code: 200, message: 'Successful', result: settins });
    } catch {
        res.status(400).send({ code: 400, message: 'Bad Request', result: null });
    }
}

export async function setCameraSettings(req: Request<any>, res: Response<Message<boolean>>, next: NextFunction) {
    try {
        Camera.getInstance(configuration.camera).setPictureOptions(req.body);
        res.status(200).send({ code: 200, message: 'Successful', result: true });
    } catch {
        res.status(400).send({ code: 400, message: 'Bad Request', result: null });
    }
}