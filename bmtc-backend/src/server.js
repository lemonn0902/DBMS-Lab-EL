require("dotenv").config();

const app = require("./app");
const db = require("./models"); // IMPORTANT

const PORT = 5000;

// connect DB + start server
db.sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Connected to PostgreSQL successfully!");
    return db.sequelize.sync(); // creates tables if not exist
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch(err => console.error("❌ DB connection error:", err));

  console.log("Loaded models:", Object.keys(db));