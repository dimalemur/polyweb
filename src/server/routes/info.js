import express from 'express';

import * as PageController from '../controllers/page';

const router = express.Router();

router.post('/info', PageController.create); // добавление записей
router.get('/info', PageController.getAll); // получение записей
router.get('/infonames', PageController.getAllNames); // получение записей
router.post('/info/deleteorder', PageController.deleteOrder); // удаление записей
router.post('/info/addorder', PageController.addOrder); // добавление приказов
router.get('/info/:login', PageController.getPagesByUserLogin); // получение записей по логину
router.get('/infobyid/:id', PageController.getPagesByUserId); // получение записей по id
router.post('/info/:id', PageController.editInfo); // изменение записей

export default router;
