import { Camera } from "../services/camera.services";
import { sendPicture } from "../services/http.services";

const camera = Camera.getInstance({});

export function stream(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        if (camera.isAvailable()) {
            camera.takePicture()
                .then(data => sendPicture(data != null ? 'data:image/jpg;base64,' + data : null))
                .catch(() => reject(null))
                .finally(() => resolve(null))
        }
    });
}
