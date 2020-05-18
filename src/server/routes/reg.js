import express from 'express';

import * as AuthControlles from '../controllers/auth';

const router = express.Router();

router.post('/signup', AuthControlles.signup); // регистрация

export default router;
