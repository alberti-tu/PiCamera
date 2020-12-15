import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';

const app = express();

app.use(cors());
app.use(helmet());

app.listen(3000, () => console.log('server is listening'));

// Frontend routes
const allowedExt = ['.js', '.ico', '.css', '.png', '.jpg', '.woff2', '.woff', '.ttf', '.svg'];
app.get('*', (req, res) => {
    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) res.sendFile(path.resolve('public/' + req.url));
    else res.sendFile(path.resolve('public/index.html'));
});