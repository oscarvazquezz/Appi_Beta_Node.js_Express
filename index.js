const express = require('express');
const cors = require('cors');
const routerApi = require('./Router/Index');
const { logErrors,boomErrorHandler,errorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3000;

const whitelist = ['htt://localhost:8000',''];

const options = {
    origin:(origin,callback) =>{
        if(whitelist.includes(origin)){
            callback(null,true);
        }else{
            callback(new Error("Not authorized"));
        }
    }
}

app.use(cors(options));

app.use(express.json());

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port,()=>{
    
})

/*
npm i nodemon eslint eslint-config-prettier eslint-plugin-prettier prettier -D
*/