const User = require('../model/User');


function userLoggedMiddleware(req, res, next){
    res.locals.isLogged = false; //Esta es una variable q puedo compartir durch las vistas
    

    let userNameInCookie = req.cookies.userName;
    let userFromCookie = User.findByField('userName', userNameInCookie);
    
    if(userFromCookie){
        req.session.userLogged = userFromCookie;
    }

    if(req.session && req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;

    }

   
    next();
}


module.exports = userLoggedMiddleware;