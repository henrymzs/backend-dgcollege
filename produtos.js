const express = require('express')
const routerProduct = express.Router()

routerProduct.get('/search', controllerGetProdutos);
routerProduct.get('/:id', controllerGetProdutosID);
routerProduct.post('/', authorization,controllerPostProduct);
routerProduct.put('/:id', authorization,controllerPutProduct);
routerProduct.delete('/:id', authorization,controllerDeleteProduct);

module.exports = routerProduct;