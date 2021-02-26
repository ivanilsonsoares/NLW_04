import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppErros } from "../errors/AppErros";
import { SurveysUserRepository } from "../repositories/SurveysUserRepository";

class AnswerController{

    async execute(request: Request, response: Response){
        const { value } = request.params;
        const  u  = request.query;

        const surveysUserRepository = getCustomRepository(SurveysUserRepository);

        const surveyUser = await surveysUserRepository.findOne({
            id:"399eafbc-613e-43e0-b71e-87f004f38be7",   
        })

    
        console.log(surveyUser)

        if(!surveyUser){
            throw new AppErros("Survey User does not exists!",400)
        }

        surveyUser.value = Number(value);

        await surveysUserRepository.save(surveyUser);

        return response.json(surveyUser);
    }

}

export { AnswerController }