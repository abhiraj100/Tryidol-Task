import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import { connect } from './utils/database.js';
import { corsOptions } from './constants/index.js';
import {v2 as cloudinary} from 'cloudinary'
import cookieParser from 'cookie-parser';

import { handleApiError } from './middleware/error.js';
import { authRouter } from './router/auth.router.js';
import { userRouter } from './router/user.router.js';

const app = express();
dotenv.config()
connect()



app.use(cookieParser())
app.use(express.json())
app.use(cors(corsOptions))

const port = process.env.PORT || 3000


app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)


app.use(handleApiError)

app.listen(port, () => {
    console.log('listening on port', port);
})


