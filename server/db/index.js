const conn = require("./conn");
const User = require("./User");
const Product = require("./Product");
const Order = require("./Order");
const LineItem = require("./LineItem");
const Cart = require("./Cart");
const CartItem = require("./CartItem");

Order.belongsTo(User);
Order.hasMany(LineItem);
LineItem.belongsTo(Order);
LineItem.belongsTo(Product);
Product.hasMany(LineItem);
Product.hasMany(CartItem);
User.hasOne(Cart);
User.hasMany(Order);
Cart.belongsTo(User);
Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);
CartItem.belongsTo(Product);

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [moe, lucy, larry, foo, bar, bazz, ethyl] = await Promise.all([
    User.create({ username: "moe", password: "123" }),
    User.create({ username: "lucy", password: "123" }),
    User.create({ username: "larry", password: "123" }),
    Product.create({ name: "foo" }),
    Product.create({ name: "bar" }),
    Product.create({ name: "bazz" }),
    User.create({ username: "ethyl", password: "123" }),
  ]);

  const cart = await ethyl.getCart();
  await ethyl.addToCart({ product: bazz, quantity: 3 });
  await ethyl.addToCart({ product: foo, quantity: 2 });
  return {
    users: {
      moe,
      lucy,
      larry,
    },
    products: {
      foo,
      bar,
      bazz,
    },
  };
};

module.exports = {
  syncAndSeed,
  User,
  Product,
  Order,
  LineItem,
  Cart,
  CartItem,
};
