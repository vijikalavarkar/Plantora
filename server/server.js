require('dotenv').config();
const express = require('express');
const app = express();
const authRouter = require('./routers/auth-router');
const connectDB = require('./utilities/db');
const errorMiddleware = require('./middlewares/error-middleware');
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/v1/auth', authRouter);

const PORT = process.env.HOST_PORT;

app.use(errorMiddleware);
connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
