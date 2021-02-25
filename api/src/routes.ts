import {Router} from 'express';
import { UserController } from './controllers/UserControllers'
import { SurveyControllers } from './controllers/SurveyControllers';
import { SendMailController } from './controllers/SendMailController';

const router = Router();

const userController = new UserController();
const surveyController = new SurveyControllers();
const sendMailController = new SendMailController

router.post("/users", userController.create);

router.post("/surveys", surveyController.create);
router.get("/surveys", surveyController.show);

router.post("/sendMail", sendMailController.execute);

export {router};