module.exports = (sequelize, DataTypes) => {
    const Shift = sequelize.define("Shift", {
      shift_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      driver_id: DataTypes.INTEGER,
      conductor_id: DataTypes.INTEGER,
      bus_id: DataTypes.INTEGER,
      route_id: DataTypes.INTEGER,
      shift_date: DataTypes.DATEONLY,
      start_time: DataTypes.TIME,
      end_time: DataTypes.TIME
    }, {
      tableName: "shift",
      timestamps: false
    });
  
    return Shift;
  };
  