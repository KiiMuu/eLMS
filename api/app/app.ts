import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import csurf from 'csurf';
import cookieParser from 'cookie-parser';
import fs from 'fs';
require('dotenv').config();
import connectToDB from './config/db';

const csrfProtection = csurf({ cookie: true });

// init ex app
let app = express();

// db connection
connectToDB;

// apply middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());

// routes
fs.readdirSync('app/routes').map((route: string) => {
	import(`./routes/${route}`).then(r => {
		app.use('/api', r.default);
	});
});

app.use(csrfProtection);

app.get('/api/csrf-token', (req, res) => {
	res.json({ csrfToken: req.csrfToken() });
});

// app port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App is up on port: ${port}`));
