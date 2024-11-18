const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Item extends Model {}

Item.init(
  {
    name: {
      type: DataTypes.STRING,  
      allowNull: false,        
    },
    description: {
      type: DataTypes.STRING,  
      allowNull: false,        
    },
    price: {
      type: DataTypes.FLOAT,   
      allowNull: false,        
    },
    category: {
      type: DataTypes.STRING, 
      allowNull: false,        
    },
    image: {
      type: DataTypes.STRING,  
      allowNull: false,        
    },
  },
  {
    sequelize,  
  }
);

module.exports = Item;
