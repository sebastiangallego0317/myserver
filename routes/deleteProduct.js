const express = require('express');
const productController = require('../controllers/product-controller');
const router = express.Router();
const ValidateAdmin = require('../middleware/ValidateAdmin')

// Ruta para eliminar un producto. Requiere autenticación JWT de administrador.
router.delete('/', ValidateAdmin.njwtAuth,productController.deleteAProduct );


module.exports = router; 