// роут для работы с пользователем

import express from 'express';

import * as UserController from '../controllers/user';

const router = express.Router();

router.get('/current-user', UserController.getCurrentUser); // запрос по api/current-user
router.post('/edituser', UserController.editUser); // редактирование логина/пароля

export default router;
