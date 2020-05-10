// роут для работы с пользователем

import express from 'express';

import * as UserController from '../controllers/user';

const router = express.Router();

router.get('/current-user', UserController.getCurrentUser); // запрос по api/current-user
router.post('/userbyid/:id', UserController.getUserById);
router.post('/userbyname/:name', UserController.getUserByName);
router.post('/userbyfnameandgroup', UserController.userbyFNameAndGroup);
router.get('/current-admin', UserController.getCurrentAdmin);
router.post('/edituser', UserController.editUser); // редактирование логина/пароля

export default router;
