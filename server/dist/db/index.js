"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uri = 'mongodb://localhost:27017/smart-cycle-market';
(0, mongoose_1.connect)(uri).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Failed to connect to MongoDB: ', err.message);
});
