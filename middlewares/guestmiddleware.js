function guestmiddleware(req, res, next) {
    if(req.session.userLogged){
        return res.redirect('/user/profile');
    }

    next();

}


module.exports = guestmiddleware