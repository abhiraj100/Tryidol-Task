import express from 'express';
import { login, logout, signup } from '../controller/auth.controller.js';

export const authRouter=express.Router();

authRouter
.route('/login')
.post(login)

authRouter
.route('/signup')
.post(signup)

authRouter
.route('/logout')
.get(logout)
