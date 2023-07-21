const express=require('express');
const product = require('./Product');
const category = require('./Category');
const user = require('./User');

const router=express.Router();

function routerApi(app){
    app.use('/App',router);
    router.use('/products',product);
    router.use('/user',user);
    router.use('/category',category)
}


module.exports = routerApi;