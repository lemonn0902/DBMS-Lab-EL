module.exports = (sequelize, DataTypes) => {
    const Driver = sequelize.define("Driver", {
      driver_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      name: DataTypes.STRING,
      license_no: {
        type: DataTypes.STRING,
        unique: true
      },
      join_date: DataTypes.DATE,
      experience_years: DataTypes.INTEGER,
      contact_no: DataTypes.STRING,
      current_status: DataTypes.STRING
    }, {
      tableName: "driver",
      timestamps: false
    });
  
    return Driver;
  };
  