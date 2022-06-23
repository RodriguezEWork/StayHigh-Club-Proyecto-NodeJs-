const express = require('express');
const { body } = require('express-validator');
const { showProducts, searchProducts, saleProducts, indexProducts, cashboxOperation, cancelOperation } = require('../controller/SellerProductsController');
const { isAuth } = require('../middlewares/isAuth');
const router = express.Router();

// Seccion de vente
router.get('/', isAuth, indexProducts);
router.get('/showProducts', isAuth, showProducts);
router.post('/searchProducts', isAuth, searchProducts);
router.post('/saleProducts', isAuth, saleProducts);

// Seccion de opeaciones
router.get('/operations', isAuth, cashboxOperation);
router.post('/operations/delete', isAuth, cancelOperation);

module.exports = router;