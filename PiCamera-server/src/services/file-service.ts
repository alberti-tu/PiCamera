import path from 'path';
import fs from 'fs';

export class File {

    constructor() {}

    public static async readDirectory(directory: string, page?: number, size?: number): Promise<string[]> {
        return new Promise<string[]>(resolve => {
            fs.readdir(directory, (err, files) => {
                if (err) {
                    fs.mkdir(path.resolve(directory), { recursive: true }, (err, res) => resolve([]))
                } else {

                    if (page != null && size != null) {
                        files = files.slice(page * size, (page + 1) * size);
                    }

                    resolve(files);
                }
            });
        });
    }

    public static async readFile(directory: string, name: string): Promise<string> {
        return null;
    }
}