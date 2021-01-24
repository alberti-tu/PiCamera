import crypto from 'crypto';

export function encrypt(data: string, key: string): string {
    key = crypto.createHash('sha256').update(key).digest('base64').substring(0, 32);

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);

    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([ encrypted, cipher.final() ]);

    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decrypt(data: string, key: string): string {
    key = crypto.createHash('sha256').update(key).digest('base64').substring(0, 32);

    const iv = Buffer.from(data.split(':')[0], 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);

    let decrypted = decipher.update( Buffer.from(data.split(':')[1], 'hex') );
    decrypted = Buffer.concat([ decrypted, decipher.final() ]);

    return decrypted.toString();
}

export function hash(data: string): string {
    return crypto.createHash('sha256').update(data).digest('hex');
}
