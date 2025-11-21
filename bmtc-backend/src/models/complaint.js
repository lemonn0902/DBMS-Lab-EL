module.exports = (sequelize, DataTypes) => {
    const Complaint = sequelize.define("Complaint", {
      complaint_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      complaint_date: DataTypes.DATE,
      status: DataTypes.STRING,
      bus_id: DataTypes.INTEGER,
      driver_id: DataTypes.INTEGER,
      complaint_details: DataTypes.TEXT
    }, {
      tableName: "complaint",
      timestamps: false
    });
  
    return Complaint;
  };
  