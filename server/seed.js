const sequelize = require("./db");
const { Item } = require("./models");
const items = require("./items2.json");

async function seed() {
  await sequelize.sync({ force: true });
  await Item.bulkCreate(items);
  console.log("Database populated");
}

seed();
