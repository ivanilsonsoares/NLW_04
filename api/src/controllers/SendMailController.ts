import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysUser } from "../models/SurveysUser";
import { SurveyRespository } from "../repositories/SurveyRepository";
import { SurveysUserRepository } from "../repositories/SurveysUserRepository";
import { UsersRespository } from "../repositories/UserRepository";
import sendMailServices from "../services/sendMailServices";


class SendMailController {
    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UsersRespository);
        const surveyRepository = getCustomRepository(SurveyRespository);
        const surveysUserRepository = getCustomRepository(SurveysUserRepository);

        const userAlreadyExists = await usersRepository.findOne({ email });

        if (!userAlreadyExists) {
            return response.status(400).json({
                error: "User does not exists",
            });
        }

        const survey = await surveyRepository.findOne({ id: survey_id });

        if (!survey) {
            return response.status(400).json({
                error: "Survey does not exists",
            });
        }

        const surveyUser = surveysUserRepository.create({
            user_id: userAlreadyExists.id,
            survey_id,
        })

        await surveysUserRepository.save(surveyUser);

        await sendMailServices.execute(email, survey.title, survey.description);

        return response.json(surveyUser);
    }
}

export { SendMailController }