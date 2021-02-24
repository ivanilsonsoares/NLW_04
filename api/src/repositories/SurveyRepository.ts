import { EntityRepository, Repository } from "typeorm";
import { Survey } from "../models/Survey";

@EntityRepository(Survey)
class SurveyRespository extends Repository<Survey>{

}



export { SurveyRespository };