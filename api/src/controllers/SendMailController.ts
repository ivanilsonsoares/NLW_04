import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyRespository } from "../repositories/SurveyRepository";
import { SurveysUserRepository } from "../repositories/SurveysUserRepository";
import { UsersRespository } from "../repositories/UserRepository";
import sendMailServices from "../services/sendMailServices";
import { resolve } from 'path';
import { AppErros } from "../errors/AppErros";



class SendMailController {
    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UsersRespository);
        const surveyRepository = getCustomRepository(SurveyRespository);
        const surveysUserRepository = getCustomRepository(SurveysUserRepository);

        const user = await usersRepository.findOne({ email });

        if (!user) {
            throw new AppErros("User does not exists",400)
        }

        const survey = await surveyRepository.findOne({ id: survey_id });

        if (!survey) {
            throw new AppErros("Survey does not exists",400)
        }

        
        const npsPath = resolve(__dirname, "..","views", "emails", "npsMail.hbs");

        const surveyAlreadyExists = await surveysUserRepository.findOne({
            where:{ user_id: user.id, value: null},
            relations: ["user", "survey"]
        });

        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            id: "",
            link:"http://localhost:3333/answers"
        }

        if(surveyAlreadyExists){
            variables.id = surveyAlreadyExists.id;
            await sendMailServices.execute(email, survey.title, variables, npsPath);
            return response.json(surveyAlreadyExists);
        }

        const surveyUser = surveysUserRepository.create({
            user_id: user.id,
            survey_id,
        })

        await surveysUserRepository.save(surveyUser);
        
        variables.id = surveyUser.id;

        await sendMailServices.execute(email, survey.title, variables, npsPath);

        return response.json(surveyUser);
    }
}

export { SendMailController }