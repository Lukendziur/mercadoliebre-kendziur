
// ESTO SERIA EL GESTOR DEL MODELO
const jsonDB = require('../model/jsonDatabase');

// Maneja todos los métodos para PRODUCTO, que lo pasa como parámetro
const productModel = jsonDB('products');

let homeController = {

    show: (req, res) => {
        const products = productModel.all();

        res.render('home', { products });


    }


}

module.exports = homeController

