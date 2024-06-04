import 'dotenv/config'
import "express-async-errors"
import "src/db"
import express from 'express';
import authRouter from 'routes/auth';
import formidable from 'formidable';
import path from 'path';

const app = express();

app.use(express.static('src/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// API Routes
app.use('/auth', authRouter)

app.post("/upload-file", async (req, res) => {
    const form = formidable({
        uploadDir: path.join(__dirname, 'public/'),
        filename(name, ext, part, form) {
            return `${Date.now()}_${part.originalFilename}`
        },
    })
    await form.parse(req)
    res.send("ok")
})

app.use(function (err, req, res, next) {
    res.status(500).json({ message: err.message })
} as express.ErrorRequestHandler)

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});