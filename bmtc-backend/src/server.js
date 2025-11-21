const app = require("./app");
const sequelize = require("./config/db");

// start server + connect to DB
sequelize.authenticate()
  .then(() => {
    console.log("Connected to PostgreSQL successfully!");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => console.error("DB connection error:", err));
