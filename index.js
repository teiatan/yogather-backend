const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const cors = require('cors');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URL);

const jwtSecret = process.env.JWT_SECRET;

const app = express();

app.use(cors({
    credentials: true,
    origin: ['http://127.0.0.1:5173', 'https://yogather.netlify.app/', 'http://localhost:5173'],
}));
app.use(express.json());
app.use(express.static("public"));
app.options('*', cors());

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.get('/', async (req, res) => {
    const result = await User.find();
    res.json(result);
});

app.post('/', async (req, res) => {
    const body = req.body;
    const createdUser = await User.create(body);
    jwt.sign({ createdUser }, jwtSecret, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token, { sameSite: 'none', secure: true }).status(201).json(createdUser);
    });
});

app.put('/:userId', async (req, res) => {
    const { userId } = req.params;
    const result = await User.findByIdAndUpdate(userId, req.body, { new: true });
    if (!result) {
        throw new Error('User is not found');
    };
    res.json(result);
});

const server = app.listen(4000);


const { Server } = require("socket.io");

const io = new Server(server, {
    cors: {
        origin: ['http://127.0.0.1:5173', 'https://yogather.netlify.app/', 'http://localhost:5173'],
    }
});
