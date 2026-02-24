import express from 'express'
import dotenv from 'dotenv'
import path from 'path';
import { fileURLToPath } from 'url';
import { UserRouter } from './routes/userRoutes.js';
import { CuncaRouter } from './routes/cuncaRoutes.js';
import { corsMiddleware } from './middlewares/cors.js';
import { authenticationMiddleware } from './middlewares/authenticationMiddleware.js';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io'
import { createServer } from 'http'
import session from 'express-session';


dotenv.config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../.env') });

const app = express();

const server = createServer(app);

const PORT = process.env.PORT

export const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../frontend/public')))

app.use(express.json());

app.use(session({ //módulo por defecto de la documentación express-session
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: function(req) {
    var match = req.url.match(/^\/([^/]+)/);
    return {
      path: match ? '/' + match[1] : '/',
      httpOnly: true,
      secure: req.secure || false,
      maxAge: 60000
    }
  }
}))


app.use(corsMiddleware());

app.use(cookieParser());

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, '../frontend/views'));

app.use((req, res, next)=>{
    authenticationMiddleware(req, res, next);
});


app.use('/cunca', UserRouter);

app.use('/cunca', CuncaRouter);

app.use('', (req, res) => {
    res.send(`Error 404: Págian no encontrada :P`);
})

server.listen(PORT, (req, res) => {
    console.log(`Escuchando servidor local en http://localhost:${PORT}/cunca/inicio`)
})