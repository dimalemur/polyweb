import express from 'express';

import * as PageController from '../controllers/page';

const router = express.Router();

router.post('/pages', PageController.create); //добавление записей
router.get('/pages', PageController.getAll); //получение записей
router.get('/pages/:login', PageController.getPagesByUserLogin); //получение записей
router.delete('/pages/:id', PageController.deletePage); //получение записей

export default router;