const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Book = db.define('Book', {
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING
    }
})

module.exports = Book