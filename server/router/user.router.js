import express from 'express';
import { protectRoute } from '../middleware/auth.js';
import { getMyProfile } from '../controller/user.controller.js';

export const userRouter=express.Router();


userRouter.use(protectRoute)

userRouter
.route('/')
.get(getMyProfile)