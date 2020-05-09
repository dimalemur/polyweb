// роут для получения данных страницы
import express from 'express';
import * as GroupsController from '../controllers/groups';

const router = express.Router();

router.get('/allgroups', GroupsController.getAllGroups); // получение всех групп
router.post('/addgroup', GroupsController.addGroup); // получение всех групп

export default router;
