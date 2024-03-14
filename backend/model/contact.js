// backend/models/Contact.js
// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: '../database/db.sqlite', // Path to SQLite database file
// });

// const Contact = sequelize.define('Contact', {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// module.exports = Contact;
var db = require('../database/index'),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;

var User = sequelize.define('random', {
    first_name: Sequelize.STRING
});

module.exports = User;
