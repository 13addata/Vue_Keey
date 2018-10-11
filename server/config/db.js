const Sequelize = require('sequelize'); 

// format: 'username@password@hostname:port/database'
const Nav = new Sequelize('mysql://admin:9669@localhost:3306/vuetest',{
  define: {
    timestamps: false 
  }
}) 

module.exports = {
  Nav
}
