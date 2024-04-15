const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// Get all products with associated Category and Tag data
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Category },
        { model: Tag, through: ProductTag }
      ]
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get one product by its ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: Category },
        { model: Tag, through: ProductTag }
      ]
    });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  // Implementation for creating a new product
  try {
    const newProduct = await Product.create({
      ...req.body,
    });
    res.json(newProduct);
  } catch (error) {
    res.json(500).json({ error: 'Failed to create category' });
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  // Implementation for updating a product
  try {
    const [updatedCount, updatedProduct] = await Product.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    if (updatedCount === 0) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(updatedProduct[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update category' })
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  // Implementation for deleting a product
  try {
    const newProduct = await Product.destroy({
      where: {
        id: req.params.id
      },
  });
  
    if (!newProduct) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.status(200).json(newProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
