const express = require('express');
const { gettAll, createNew, getById, deleteById, updateById } = require('../controller/modelController');
const router = express.Router();

router.get('/products', gettAll);
router.post('/products', createNew);
router.get('/products/:id', getById);
router.delete('/products/:id', deleteById);
router.put('/products/:id', updateById);

module.exports = router;