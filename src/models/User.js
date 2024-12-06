const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          const hash = bcrypt.hashSync(value, 10);
          this.setDataValue('password', hash);
        }
      }
    }, {
      sequelize,
      tableName: 'users',
      timestamps: true,
      underscored: true
    });
  }
}

module.exports = User;