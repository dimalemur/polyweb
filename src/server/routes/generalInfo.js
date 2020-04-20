// роут для получения данных страницы
import express from 'express';
import * as GeneralInfoController from '../controllers/general';

const router = express.Router();

router.get('/getjobnews', GeneralInfoController.getJobNews); // получение записей

export default router;
