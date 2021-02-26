import express, { NextFunction, Request, response, Response } from 'express';
import "express-async-errors"
import createConnection from "./database";
import { AppErros } from './errors/AppErros';
import { router } from './routes';

createConnection();
const app = express();

app.use(express.json());

app.use(router);

app.use(
    (err: Error, request: Request, response: Response, _Next: NextFunction) => {
        if (err instanceof AppErros) {
            return response.status(err.statusCode).json({
                message: err.message
            })
        }

        return response.status(500).json({
            status: "Error",
            message: `Internal server error ${err.message}`
        })

    }
);

export { app }