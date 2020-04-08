import express from 'express';

import * as PageController from '../controllers/page';

const router = express.Router();

router.post('/info', PageController.create); //добавление записей
router.get('/info', PageController.getAll); //получение записей
router.get('/info/:login', PageController.getPagesByUserLogin); //получение записей
router.post('/info/:id', PageController.editInfo); //изменение записей

export default router;
