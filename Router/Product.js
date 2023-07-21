const express = require('express');
const faker = require('faker');
const ProductsService = require('./../Service/Product');
const validatirHandler = require('./../middlewares/validator.handler');
const { createProductSchema,updateProductSchema,getProductSchema  } = require('./../schema/Product')

const router = express.Router();
const ProductServices = new ProductsService();

router.get('/', async (req, res) => {
    const products = await ProductServices.find();
    res.json(products);
});

router.get('/filter', (req, res) => {
    res.send('Yo soy un filter');
});

router.get('/:id',validatirHandler(getProductSchema,'params'),async (req, res,next) => {
  try {
    const { id } = req.params;
    const product = await ProductServices.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/',validatirHandler(createProductSchema,'body'), async (req, res) => {
    const body = req.body;
    const newProduct = await ProductServices.create(body)
    res.status(201).json({
      message: 'created',
      data: newProduct
    });
});
  
router.patch('/:id',validatirHandler(getProductSchema,'params'),
        validatirHandler(updateProductSchema,'body'),async (req, res,next) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const product = await ProductServices.update(id, body);
        res.json(product);
    } catch (error) {
        next(error);
    }
});
  
router.delete('/:id',validatirHandler(getProductSchema,'params'),async (req, res) => {
    const { id } = req.params;
    const product = await ProductServices.delete(id);
    res.json({
      message: 'deleted',
      data:product,
    });
});
 
module.exports = router;