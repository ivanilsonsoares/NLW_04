import {Request, Response} from "express";
import { getCustomRepository } from "typeorm";
import { SurveyRespository } from "../repositories/SurveyRepository";
class SurveyControllers{
    async create(request: Request, response: Response){
        const {title, description} = request.body;

        const surveysRespository = getCustomRepository(SurveyRespository);

        const survey = surveysRespository.create({
            title,
            description
        });

        await surveysRespository.save(survey);

        return response.status(201).json(survey);
    }
    async show(request: Request, response: Response){
        const surveysRespository = getCustomRepository(SurveyRespository);

        const all = await surveysRespository.find();

        return response.json(all);
    }
}

export { SurveyControllers }