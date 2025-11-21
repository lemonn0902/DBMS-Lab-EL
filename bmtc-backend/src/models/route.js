module.exports = (sequelize, DataTypes) => {
    const Route = sequelize.define("Route", {
      route_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      start_point: DataTypes.STRING,
      end_point: DataTypes.STRING,
      total_distance: DataTypes.FLOAT,
      average_duration: DataTypes.STRING   // Interval stored as text in JS
    }, {
      tableName: "route",
      timestamps: false
    });
  
    return Route;
  };
  