const sequelize = require("sequelize");
const { Box_Product } = require("./box_product");
const { Cashbox } = require("./Cashbox");
const { Combination } = require("./Combination");
const { Product } = require("./Product");
const { Product_Combination } = require("./product_combination");
const { Role } = require("./Role");
const { Sale } = require("./Sale");
const { Ticket } = require("./Ticket");
const { User } = require("./User");


User.belongsTo(Role);
Role.hasMany(User);

Sale.belongsTo(Cashbox);
Sale.belongsTo(Product);
Sale.belongsTo(Combination);
Sale.belongsTo(Ticket);

Ticket.hasMany(Sale);
Product.hasMany(Sale);
Combination.hasMany(Sale);
Cashbox.hasMany(Sale);

Cashbox.belongsTo(User);
User.hasOne(Cashbox);

Box_Product.belongsTo(Cashbox);
Box_Product.belongsTo(Product);
Box_Product.belongsTo(Combination);

Cashbox.hasMany(Box_Product);
Product.hasMany(Box_Product);
Combination.hasMany(Box_Product);

Product_Combination.belongsTo(Product);
Product_Combination.belongsTo(Combination);

Product.hasMany(Product_Combination);
Combination.hasMany(Product_Combination);