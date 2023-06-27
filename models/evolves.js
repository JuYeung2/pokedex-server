const Sequelize = require("sequelize");

module.exports = class Evolve extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {},
      {
        sequelize,
        underscored: true,
        timestamps: false,
      }
    );
  }
  static associate(db) {
    db.Evolve.belongsTo(db.Pokemon, {
      foreignKey: {
        name: "pokeid",
        onDelete: "SET NULL",
        as: "Pokemon",
      },
    });
  }
};