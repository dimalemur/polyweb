// роут для получения данных страницы
import express from 'express';
import * as GroupsController from '../controllers/groups';

const router = express.Router();

router.get('/allgroups', GroupsController.getAllGroups); // получение всех групп
router.post('/addgroup', GroupsController.addGroup); // добавление группы
router.get('/getgroupinfo', GroupsController.getGroupInfo); // получение группы
router.post('/deletefromgroups', GroupsController.deleteFromGroups);
router.post('/addfromgroups', GroupsController.addFromGroups);

export default router;
