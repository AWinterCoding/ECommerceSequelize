const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const categories = await Category.findAll(
      {
       include:[{model:Product}]
     }
    );
    res.status(200).json(categories);
  } catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const category = await Category.findByPk(req.params.id, {
      include: [{model:Product}]
    });
    if(!category){res.status(404).json({message: 'no category found'});
    return;
  }res.status(200).json(category);
  }catch(err){
    res.status(500).json(err);
  }
}
);

router.post('/', async (req, res) => {
  // create a new category
  try{
    const categoryInfo = await Category.create(req.body);
    res.status(200).json(categoryInfo);
  }catch(err){
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const categoryInfo = await Category.update(req.body, {
      where:{
        id: req.params.id,
      },
      individualHooks: true
    });
    if(!categoryInfo[0]){
      res.status(404).json({message: 'No Category with this ID'});
    }
    res.status(200).json(categoryInfo[0]);
  }catch(err){
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const categoryInfo = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if(!categoryInfo){
      res.status(400).json({message: "No Category found with this ID"});
    }
    res.status(200).json(categoryInfo);
  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
