const connectDB = require('./startup/db');
const express = require('express');
const cors = require('cors');
const app = express();
const comments = require('./routes/comments');

connectDB();

app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use(express.json());
app.use('/api/comments', comments);

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Serverstartedonport:${port}`);
});