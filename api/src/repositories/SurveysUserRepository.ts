import { EntityRepository, Repository } from "typeorm";
import { SurveysUser } from "../models/SurveysUser";

@EntityRepository(SurveysUser)
class SurveysUserRepository extends Repository<SurveysUser>{}

export { SurveysUserRepository }