import moment from 'moment';
import path from 'path';
import fs from 'fs';

export class File {

    constructor() {}

    public static readDirectory(directory: string, page?: number, size?: number): string[] {
        try {
            let files: string[] = fs.readdirSync(directory);
            files = files.reverse();

            if (page != null && size != null && page >= 0 && size >= 0) {
                files = files.slice(page * size, (page + 1) * size);
            }

            return files;
        } catch {
            fs.mkdirSync(path.resolve(directory), { recursive: true });
            return [];
        }
    }

    public static readFile(directory: string, name: string, encode?: 'ascii' | 'base64'): string {
        try {
            const file: Buffer = fs.readFileSync(directory + '/' + name);
            return file.toString(encode != null ? encode : 'ascii');
        } catch {
            return null;
        }
    }

    public static removeFile(directory: string, name: string): boolean {
        try {
            fs.unlinkSync(directory + '/' + name);
            return true;
        } catch {
            return false;
        }
    }

    public static writeFile(directory: string, data: string, extension: 'txt' | 'jpg' | 'png', name?: string): boolean {
        try {
            if (name == null || name.replace(/ /g, '') == '') {
                name = this.getName(directory);
            } else {
                this.readDirectory(directory);
            }
    
            fs.writeFileSync(directory + '/' + name + '.' + extension, data, extension != 'txt' ? 'base64' : null);

            return true;
        } catch {
            return false;
        }
    }

    private static getName(directory: string): string {
        let num = 0;
        
        const date = moment().format('YYYY-MM-DD');
        const files = File.readDirectory(directory);
        
        files.forEach(item => {
            if (date == item.split('_')[0]) {
                num = Math.max(num, parseInt(item.split('_')[1].split('.')[0]));
            }
        });

        return date + '_' + (num + 1);
    }

}
