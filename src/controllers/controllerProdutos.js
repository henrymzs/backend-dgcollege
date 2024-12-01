const express = require('express')


const controllerGetProdutos = (req, res) => {
    getProduct(req, res)
}

const controllerGetID = (req, res) => {
    getProductID(req, res)
}

const controllerPostProduct = (req, res) => {
    postProduct(req, res)
}

const controllerPutProduct = (req, res) => {
    putProduct(req,res)
}

const controllerDeleteProduct = (req,res) => {
    deleteProdutos(req,res)
}

module.exports = {
    controllerGetProdutos,
    controllerGetID,
    controllerPostProduct,
    controllerPutProduct,
    controllerDeleteProduct
}