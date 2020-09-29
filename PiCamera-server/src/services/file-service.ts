import moment from 'moment';
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

    public static async getName(directory: string): Promise<string> {
        let num = 0;
        
        const date = moment().format('YYYY-MM-DD');
        const files = await File.readDirectory(directory);
        
        files.forEach(item => {
            if (date === item.split('_')[0]) {
                num = Math.max(num, parseInt(item.split('_')[1].split('.')[0]));
            }
        });

        return date + '_' + (num + 1);
    }
}