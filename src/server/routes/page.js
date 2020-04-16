// роут для получения данных страницы
import express from 'express';
import * as PageController from '../controllers/page';

const router = express.Router();

router.post('/addgrades', PageController.addGrages); // добавление записей
router.post('/editgrades/:gradesId', PageController.editGrages); // изменение записей
router.get('/getgrades', PageController.getGrages); // получение записей
router.delete('/deletegrades/:semester', PageController.deleteGrages); // удаление записей

router.post('/addsportvisit', PageController.addSportVisit); // добавление записей
router.post('/editsportvisit/:visitId', PageController.editSportVisit); // изменение записей
router.get('/getsportvisit', PageController.getSportVisit); // получение записей
router.delete('/deletesportvisit/:semester', PageController.deleteSportVisit); // удаление записей

export default router;
