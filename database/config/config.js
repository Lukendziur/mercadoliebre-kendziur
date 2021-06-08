module.exports = {
  "development": {
    "username": "root",
    "password": "root",
    "database": "database_development", //nombre de la base de datos. En este caso no hay jaja
    "host": "127.0.0.1", //puerto en el que se encuentra mi base de datos
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
