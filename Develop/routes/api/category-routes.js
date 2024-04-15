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

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
      ...req.body,
    });
    // Respond with the newly created category
    res.json(newCategory);
  } catch (error) {
    // Handle any errors that occur during category creation
    res.status(500).json({ error: 'Failed to create category' });
  }
});


router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const [updatedCount, updatedCategories] = await Category.update(req.body, {
      where: { id: req.params.id },
      returning: true, // Return the updated category
    });
    if (updatedCount === 0) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.json(updatedCategories[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update category' });
  }
});


router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const newCategory = await Category.destroy({
      where: {
       id: req.params.id
      },
    });

    if (!newCategory) {
      res.status(404).json({ message: 'No category found with this id! '});
      return;
    }

    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
