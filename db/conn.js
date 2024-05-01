const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('db_description', 'root', 'root', {
    host: 'mysql_book',
    port: 3306,
    dialect: 'mysql'
})


try{
    sequelize.authenticate()
    console.log('Conexão estabelecida com o banco')
}catch(err){
    console.log(`Não foi possível estabelecer a conexão com o banco: ${err}`)
}

module.exports = sequelize