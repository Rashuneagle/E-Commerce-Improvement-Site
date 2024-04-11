const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
try {
  const categories = await Category.findAll({
    include: [
      { model: Product }
    ]
  });
  res.json(categories)
} catch (error) {
  res.status(500).json({ error: 'Internal Server Error'});
}
});
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
try {
  const category = await Category.findByPk(req.params.id, {
    include: [
      { model: Product },
    ]
  });
  if (category) {
    res.json(category);
  } else {
    res.status(404).json({ message: 'Category not found' });
  }
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
