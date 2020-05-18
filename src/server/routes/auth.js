import express from 'express';

import * as AuthControlles from '../controllers/auth';

const router = express.Router();

router.post('/signin', AuthControlles.signin); // авторизация
router.post('/admin/signup', AuthControlles.regAdmin); // регистрация админа
router.post('/admin/signin', AuthControlles.adminSignin); // авторизация админа

export default router;
