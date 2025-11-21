module.exports = (sequelize, DataTypes) => {
    const AccidentReport = sequelize.define("AccidentReport", {
      accident_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      bus_id: DataTypes.INTEGER,
      driver_id: DataTypes.INTEGER,
      route_id: DataTypes.INTEGER,
      location: DataTypes.STRING,
      cost: DataTypes.INTEGER,
      accident_date: DataTypes.DATE,
      accident_details: DataTypes.TEXT
    }, {
      tableName: "accident_report",
      timestamps: false
    });
  
    return AccidentReport;
  };
  