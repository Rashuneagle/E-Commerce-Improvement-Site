// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(ProductTag, {
  through: 'ProductTag', // Name of the junction table
  foreignKey: 'product_id', 
  onDelete: 'CASCADE',
});
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(ProductTag, {
  through: 'ProductTag', 
  foreignKey: 'tag_id', // Name of the foreign key column in the junction table
  onDelete: 'CASCADE',
});
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
