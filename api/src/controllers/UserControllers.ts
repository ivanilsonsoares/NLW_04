import {Request, Response} from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import {User} from '../models/User';
import { UsersRespository } from '../repositories/UserRepository';

class UserController {

    async create(request: Request, response: Response) {
        const {name, email} = request.body;
        const usersRespository = getCustomRepository(UsersRespository);



        const userAreadyExists = await usersRespository.findOne({
            email
        });

        if(userAreadyExists){
            return response.status(400).json({
                error : "User already exists!"
            })
        }

        const user = usersRespository.create({
            name, email
        })

        await usersRespository.save(user);

        return response.json(user);
    }

}

export {UserController}