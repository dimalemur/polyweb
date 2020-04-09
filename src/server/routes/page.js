// роут для получения данных страницы
import express from 'express';
import * as PageController from '../controllers/page';

const router = express.Router();

router.post('/addgrades', PageController.addGrages); // добавление записей
router.post('/editgrades/:gradesId', PageController.editGrages); // изменение записей
router.get('/getgrades', PageController.getGrages); // добавление записей
router.delete('/deletegrades/:semestr', PageController.deleteGrages); // добавление записей

export default router;
