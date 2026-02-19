import express from 'express'
import dotenv from 'dotenv'
import path from 'path';
import { fileURLToPath } from 'url';
import { UserRouter } from './routes/userRoutes.js';
import { CuncaRouter } from './routes/cuncaRoutes.js';
import { corsMiddleware } from './middlewares/cors.js';
import cookieParser from 'cookie-parser';

dotenv.config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../.env') });

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend/views'));

app.use(express.json());

app.use(corsMiddleware());

app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../frontend/public')))

app.use('/cunca', UserRouter);
app.use('/cunca', CuncaRouter);

app.use('', (req, res)=>{
    res.send(`Error 404: Págian no encontrada :P`);
})

app.listen(PORT, (req, res)=>{
    console.log(`Escuchando servidor local en http://localhost:${PORT}/cunca/inicio`)
})