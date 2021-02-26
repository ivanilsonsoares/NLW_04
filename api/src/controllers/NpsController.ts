import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveysUserRepository } from "../repositories/SurveysUserRepository";

class NpsController{

    async excute(request: Request, response: Response){

        const {survey_id} = request.params;

        const surveysUserRepository = getCustomRepository(SurveysUserRepository);

        const surveyUsers = await surveysUserRepository.find({
            survey_id: "5234ebcb-7271-46ed-b157-8181e5894cac", //não ta pegando ID 
            value: Not(IsNull())
        });

        console.log(surveyUsers)

        const detractor = surveyUsers.filter(
            (survey) => survey.value >= 0 && survey.value <= 6
        ).length;
        
        const promoters = surveyUsers.filter(
            (survey) => survey.value >= 9 && survey.value <= 10
        ).length;

        const passive = surveyUsers.filter(
            (survey) => survey.value >= 7 && survey.value <= 8
        ).length;

        const totalAnswers = surveyUsers.length;

        const calculate = Number(
            (((promoters - detractor ) / totalAnswers) * 100).toFixed(2)
        );

        return response.json({
            detractor,
            promoters,
            passive,
            totalAnswers,
            nps: calculate
        })
    }
}

export { NpsController }