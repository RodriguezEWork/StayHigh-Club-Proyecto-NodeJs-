const express = require('express');
const { body } = require('express-validator');
const { isAuth, isAdmin } = require('../middlewares/isAuth');
const router = express.Router();
const moment = require('moment');
const { Product } = require('../models/Product');
const { indexProduct, createProduct, updateProduct, deleteProduct } = require('../controller/ABM/ProductController');
const { indexTicket, createTicket, updateTicket, deleteTicket } = require('../controller/ABM/TicketController');
const { indexCashbox, createCashbox, updateCashbox, deleteCashbox } = require('../controller/ABM/CashboxController');
const { indexUser, deleteUser, createUser, updateUser } = require('../controller/ABM/UserController');
const { indexCombination, deleteCombination, createCombination, updateCombination } = require('../controller/ABM/CombinationController');
const { indexProductCombination, createProductCombination, updateProductCombination, deleteProductCombination } = require('../controller/ABM/ProductCombinationController');
const { indexReport, filterReport } = require('../controller/ReportController');
const { Dashboard } = require('../controller/PageController');
const { indexProductBox, createProductBox, updateProductBox, deleteProductBox } = require('../controller/ABM/ProductBoxController');

//Ruta del index en Admin
router.get('/', isAuth, isAdmin, Dashboard);

//Rutas directas al CRUD de los productos unicos
router.get('/products-unicos', isAuth, isAdmin, indexProduct);
router.post('/products-create', isAuth, isAdmin, createProduct);
router.post('/products-update', isAuth, isAdmin, updateProduct);
router.post('/products-delete', isAuth, isAdmin, deleteProduct);

//Rutas directas al CRUD de los producto combinados
router.get('/combinations-total', isAuth, isAdmin, indexCombination);
router.post('/combinations-create', isAuth, isAdmin, createCombination);
router.post('/combinations-update', isAuth, isAdmin, updateCombination);
router.post('/combinations-delete', isAuth, isAdmin, deleteCombination);

//Rutas directas al CRUD de los Product-Combinations
router.get('/products-combination/:id', isAuth, isAdmin, indexProductCombination);
router.post('/products-combination-create', isAuth, isAdmin, createProductCombination);
router.post('/products-combination-update', isAuth, isAdmin, updateProductCombination);
router.post('/products-combination-delete', isAuth, isAdmin, deleteProductCombination);

//Rutas directas al CRUD de los tickets
router.get('/tickets-total', isAuth, isAdmin, indexTicket);
router.post('/tickets-create', isAuth, isAdmin, createTicket);
router.post('/tickets-update', isAuth, isAdmin, updateTicket);
router.post('/tickets-delete', isAuth, isAdmin, deleteTicket);

//Rutas directas al CRUD de los Cashboxes
router.get('/cashbox-total', isAuth, isAdmin, indexCashbox);
router.post('/cashbox-create', isAuth, isAdmin, createCashbox);
router.post('/cashbox-update', isAuth, isAdmin, updateCashbox);
router.post('/cashbox-delete', isAuth, isAdmin, deleteCashbox);

//Rutas directas al CRUD de los Product-Combinations
router.get('/products-cashbox/:id', isAuth, isAdmin, indexProductBox);
router.post('/products-cashbox-create', isAuth, isAdmin, createProductBox);
router.post('/products-cashbox-update', isAuth, isAdmin, updateProductBox);
router.post('/products-cashbox-delete', isAuth, isAdmin, deleteProductBox);

//Rutas directas al CRUD de los Usuarios
router.get('/users-total', isAuth, isAdmin, indexUser);
router.post('/users-create', isAuth, isAdmin, createUser);
router.post('/users-update', isAuth, isAdmin, updateUser);
router.post('/users-delete', isAuth, isAdmin, deleteUser);

//Rutas directas del reporte
router.get('/reporte', isAuth, isAdmin, indexReport);
router.post('/reporte-filter', isAuth, isAdmin, filterReport);

module.exports = router;