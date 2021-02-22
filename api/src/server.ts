import express, { request, response } from 'express';

const app = express();

app.get("/", (request, response) =>{
    return response.json({message : "Hello Word - NLW04"});
});

app.post("/", (request, response)=>{
    return response.json({message: "Os dados forma salvos com sucesso!"});
})

app.listen(3333, ()=> console.log("Serve is running"));

