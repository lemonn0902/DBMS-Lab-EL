module.exports = (sequelize, DataTypes) => {
    const Bus = sequelize.define("Bus", {
      bus_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      depot_name: DataTypes.STRING,
      capacity: DataTypes.INTEGER,
      type: DataTypes.STRING,
      registration_no: {
        type: DataTypes.STRING,
        unique: true
      }
    }, {
      tableName: "bus",
      timestamps: false
    });
  
    return Bus;
  };
  