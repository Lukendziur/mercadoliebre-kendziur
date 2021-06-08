const bcryptjs = require('bcryptjs');

const {validationResult} = require('express-validator');

const User = require('../model/User')


let userController = {
    register: (req, res) => {

        
        res.render('register');
    },

    processRegister: (req, res) =>{
       const resultValidation = validationResult(req);
       if(resultValidation.errors.length > 0){
        return res.render('register', {
            errors: resultValidation.mapped(),
            oldData: req.body //Esto es para que no se vaya borrando lo que uno escribe
        });
    }

    let userInDB = User.findByField('userName', req.body.userName);
      if(userInDB){
        return res.render('register', {
            errors: {
                userName: {
                    msg: 'Este usuario ya está registrado'
                }
            },
            oldData: req.body 
        });
      }

    let userToCreate = {
        ...req.body,
        password: bcryptjs.hashSync(req.body.password, 10),
        avatar: req.file.filename
    }
      let userCreated = User.create(userToCreate); 
       return res.redirect('/user/login') //acá iria un res.redirect hacia la página del uduario
    },

    login: (req, res) => {

        res.render('login')
    },

    processLogin:(req, res) => {  
        //LOGICA

        
        const resultValidation = validationResult(req); //¿HAY ERRORES?
       if(resultValidation.errors.length > 0){
        return res.render('login', {          
            errors: resultValidation.mapped(),               //SI LOS HAY, MOSTRAME EL LOGIN PERO CON LOS ERRORES.
            oldData: req.body //Esto es para que no se vaya borrando lo que uno escribe
        });

        }


        let userToLogin = User.findByField('userName', req.body.userName);
     
        if(userToLogin){

        let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);

        if(isOkThePassword){
            delete userToLogin.password; //por seguridad
            req.session.userLogged = userToLogin;

            if(req.body.remember_user){
                res.cookie('userName', req.body.userName, {maxAge: (1000 * 60) * 2});
            }
              return res.redirect('/user/profile')
            
        }
          return res.render('login', {
            errors: {
                userName: {
                    msg: 'Credenciales inválidas'
                }
            }
        });
        }
        return res.render('login', {
            errors: {
                userName: {
                    msg: 'No se ha encontrado el usuario'
                }
            }
        });
    
    //    return res.send('Ha ingresado con éxito') //acá iria un res.redirect hacia la página del uduario
    
    },
    profile: (req, res) =>{
        res.render('profile', {
            user: req.session.userLogged
        });

    },
    logout: (req, res) =>{
        res.clearCookie('userName');
        req.session.destroy();
        return res.redirect('/');
    }
    
}

module.exports = userController

