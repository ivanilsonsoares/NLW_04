import {Router} from 'express';
import { UserController } from './controllers/UserControllers'
import { SurveyControllers } from './controllers/SurveyControllers';

const router = Router();

const userController = new UserController();
const surveyController = new SurveyControllers();

router.post("/users", userController.create);

router.post("/surveys", surveyController.create);
router.get("/surveys", surveyController.show);

export {router};