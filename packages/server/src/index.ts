import 'dotenv/config';
import express from 'express';
import "express-async-errors";
import authRouter from 'routes/auth';
import "src/db";
import productRouter from './routes/product';
const app = express();

app.use(express.static('src/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(function (req, res, next) {
    console.log(req.url)
    next();
} as express.RequestHandler)


// API Routes
app.use('/auth', authRouter)
app.use('/product', productRouter)

app.use(function (err, req, res, next) {
    res.status(500).json({ message: err.message })
} as express.ErrorRequestHandler)

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});