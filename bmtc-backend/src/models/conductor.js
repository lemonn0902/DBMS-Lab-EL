module.exports = (sequelize, DataTypes) => {
    const Conductor = sequelize.define("Conductor", {
      conductor_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      name: DataTypes.STRING,
      join_date: DataTypes.DATE,
      contact_no: DataTypes.STRING,
      assigned_route: DataTypes.INTEGER
    }, {
      tableName: "conductor",
      timestamps: false
    });
  
    return Conductor;
  };
  