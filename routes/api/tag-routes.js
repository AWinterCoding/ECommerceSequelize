const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tagInfo = await Tag.findAll(
      {
       include:[{model:Product}]
     }
    );
    res.status(200).json(tagInfo);
  } catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tagInfo = await Tag.findByPk(req.params.id,
      {include: [{model:Product}]}
    );
    if(!tagInfo){
      res.status(404).json({message: "No Tags found with that ID"});
    }
    res.status(200).json(tagInfo);
  }catch(err){
    res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  // create a new tag
  try{
    const TagInfo = await Tag.create(req.body);
    res.status(200).json(TagInfo);
  }catch(err){
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const TagInfo = await Tag.update(req.body, {
      where:{
        id: req.params.id,
      },
      individualHooks: true
    });
    if(!TagInfo[0]){
      res.status(404).json({message: 'No Tag with this ID'});
    }
    res.status(200).json(TagInfo);
  }catch(err){
    res.status(400).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try{
    const TagInfo = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!TagInfo){
      res.status(400).json({message: "No Tag found with this ID"});
    }
    res.status(200).json(TagInfo);
  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
