const express = require('express')

const router = express.Router()

const controller = require('../controller/productoController');
const multer = require('multer');
const {body} = require('express-validator')
const path = require('path');


const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../public/images'),
    filename: (req, file, cb) => {
        cb(null, 'img-' + Date.now() + path.extname(file.originalname));
    }
});





const validations = [
    body('name').notEmpty().withMessage('Se requiere un nombre'),
    body('price').notEmpty().withMessage('Se requiere un nombre de usuario'),
    body('image').custom((value, { req }) =>{
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.gif', '.png'];      
        
        if(!file){
            throw new Error ('Tenés que subir una imagen');

        }else{
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)){
            throw new Error(`Las extensiones de archivo permitidas son  ${acceptedExtensions.join(', ')}`);
        
        }
        
    }
    return true;
    })
  
];

const editValidations = [
    body('name').notEmpty().withMessage('Debes completar con un nombre válido'),
    body('price').notEmpty().withMessage('Debes completar con un precio válido').bail()
    .isNumeric().withMessage('Debes completar con un número')
    
];


const upload = multer({ storage });

// Formulario de creación de productos (GET)
router.get('/cart', controller.cart);

// Formulario de creación de productos (GET)
router.get('/create', controller.create);


// Detalle de un producto particular (GET)
router.get('/:id', controller.show);

// El get de la Barra de Búsqueda
router.get('/search', controller.search)


// Formulario de edición de productos (GET)
router.get('/:id/edit', controller.edit);

// Acción de creación (a donde se envía el formulario) (POST)
router.post('/store', upload.single('image'), validations, controller.store);//image es el name del input del form//single = un solo archivo

// Acción de edición (a donde se envía el formulario) (PUT)
router.put('/:id', upload.single('image'), editValidations, controller.update);

// Acción de borrado (DELETE)
router.delete('/:id', controller.destroy);

module.exports = router;