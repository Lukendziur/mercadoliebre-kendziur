

const { log } = require('console');
const fs = require('fs');

const User = {
    fileName: './data/users.json',

    getData: function(){
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8')); //Sin el JSON.parse, me devolvería un string. Con el JSON.parse me devuelve un array que puedo manipular como quiero.
    },
    generateId: function(){
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if(lastUser){
            return lastUser.id + 1;
        }else{
            return 1;
        } //SI NO TENGO NINGÚN DATO EN EL JSON, DEJAR UN []!!
        
    },
    findAll: function() {
        return this.getData(); //me devuelve el array de objetos literales
    },

    findByPk: function(id){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id);//El método find recibe una función callback, a la cual le vamos a decir: vos vas a iterar todo este array de a un usuario y quierp que me retornes aquel usuario cuyo id sea igual a este id(el parametro).
        return userFound;
       
        
    },
    
    findByField: function(field, text){ //Este método me permite buscar un usuario poniendo el nombre del campo y un dato introducido por él. Ej: console.log(User.findbyField('name', 'Lucila')); => esto me devuelve el objeto literal que contiene, en este caso, mis datos.
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);//El método find recibe una función callback, a la cual le vamos a decir: vos vas a iterar todo este array de a un usuario y quierp que me retornes aquel usuario cuyo id sea igual a este id(el parametro).
        return userFound;
       
        
    },
    create: function(userData) {
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null,' '));
        return newUser;



    },
    delete: function (id){
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id)
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null,' '));
        return true;  

    }

}

module.exports = User