const express = require('express');
const router = express.Router();
const { Tag, Product } = require('../../models');

// GET all tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [Product] // Include associated product data
    });
    res.json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET a single tag by ID
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [Product] // Include associated product data
    });
    if (tag) {
      res.json(tag);
    } else {
      res.status(404).json({ message: 'Tag not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create tag' });
  }
});

// PUT update a tag's name by ID
router.put('/:id', async (req, res) => {
  try {
    const [updatedCount, updatedTags] = await Tag.update(
      { name: req.body.name },
      { where: { id: req.params.id }, returning: true }
    );
    if (updatedCount === 0) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    res.json(updatedTags[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update tag' });
  }
});

// DELETE a tag by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedCount = await Tag.destroy({ where: { id: req.params.id } });
    if (deletedCount === 0) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete tag' });
  }
});

module.exports = router;
