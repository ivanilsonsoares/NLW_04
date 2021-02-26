import {Request, Response} from 'express';
import { getCustomRepository} from 'typeorm';
import { UsersRespository } from '../repositories/UserRepository';
import * as yup from 'yup';
import { AppErros } from '../errors/AppErros';

class UserController {

    async create(request: Request, response: Response) {
        const {name, email} = request.body;

        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required()
        })

        try {
            await schema.validate(request.body,{abortEarly: false});
        } catch (err) {
            throw new AppErros(err, 400);
        }

        const usersRespository = getCustomRepository(UsersRespository);

        const userAreadyExists = await usersRespository.findOne({
            email
        });

        if(userAreadyExists){
            throw new AppErros("User already exists!",400)
        }

        const user = usersRespository.create({
            name, email
        })

        await usersRespository.save(user);

        return response.status(201).json(user);
    }

}

export {UserController}