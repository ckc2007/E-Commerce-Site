const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  try {
    // be sure to include its associated Products
    const categoryData = await Category.findAll({include: [Product]})
  res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(500).send(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    })
    res.status(200).json(categoryData)
  }
  catch (err) {
    res.status(500).send(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory)
  }
  catch (err) {
    res.status(400).send(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(categoryData)
  }
  catch (err) {
    res.status(500).send(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      were: {
        id: req.params.id
      }
    })
    res.status(200).json(categoryData)
  }
  catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
