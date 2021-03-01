import { Camera } from "../services/camera.services";
import { sendPicture } from "../services/http.services";

const camera = Camera.getInstance({});

export function stream(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        if (camera.isAvailable()) {
            camera.takePicture()
                .then(async data => {
                    const getSettings = await sendPicture(data != null ? 'data:image/jpg;base64,' + data : null);
                    getSettings ? reject(null) : resolve(null);
                })
                .catch(() => {
                    reject(null);
                })
        }
    });
}
