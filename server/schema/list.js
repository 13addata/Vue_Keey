/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('list', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    item_name: {
      type: DataTypes.CHAR(30),
      allowNull: false
    },
    item_link: {
      type: DataTypes.CHAR(100),
      allowNull: false
    },
    item_icon: {
      type: DataTypes.CHAR(100),
      allowNull: false
    },
    group: {
      type: DataTypes.CHAR(20),
      allowNull: false
    }
  }, {
    tableName: 'list'
  });
};
