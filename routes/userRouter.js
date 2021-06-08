const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const path = require('path');

const guestmiddleware = require('../middlewares/guestmiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
//Configuración de multer
const multer = require('multer');
const {body} = require('express-validator'); //body tmb se puede usar como 'check'
const User = require('../model/User');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/avatars');
    },
    filename: (req, file, cb) => {
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
    
})
const uploadFile = multer({storage});


const validations = [
    body('name').notEmpty().withMessage('Se requiere un nombre'),
    body('userName').notEmpty().withMessage('Se requiere un nombre de usuario'),
    body('fecha').notEmpty().withMessage('Se requiere una fecha de nacimiento'),
    body('addresse').notEmpty().withMessage('Se requiere una dirección'),
    body('perfil').notEmpty().withMessage('Se requiere una opción'),
    body('intereses').notEmpty().withMessage('Se requiere una opción'),
    body('avatar').custom((value, { req }) =>{
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
    }),
    body('password').notEmpty().withMessage('Se requiere una contraseña').bail().isLength({min: 8}).withMessage('La contraseña debe ser de al menos 8 caracteres'),

    // ejemplo para validación de email:
    // body('email').notEmpty().withMessage('Se requiere un email').bail()
    // .isEmail().withMessage('debes poner un email válido)
    // 

]
const validationLogin = [
    body('userName').notEmpty().withMessage('Se requiere un nombre de usuario'),
    body('password').notEmpty().withMessage('Se requiere una contraseña').bail().isLength({min: 8}).withMessage('La contraseña debe ser de al menos 8 caracteres')


    
]


//implementacion sobre el router
router.get('/Register', guestmiddleware, userController.register);
router.post('/Register', uploadFile.single('avatar'), validations, userController.processRegister);

router.get('/Login', guestmiddleware, userController.login);

router.post('/login', validationLogin, userController.processLogin)

// //Perfil del usuario
router.get('/profile', authMiddleware, userController.profile);


router.get('/logout', userController.logout);



 module.exports = router;
