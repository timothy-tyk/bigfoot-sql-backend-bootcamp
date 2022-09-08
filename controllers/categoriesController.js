const BaseController = require("./baseController");

class CategoriesController extends BaseController {
  constructor(model, sightingCategoryModel) {
    super(model);
    this.sightingCategoryModel = sightingCategoryModel;
    // this.commentModel = commentModel;
    // this.likesModel = likesModel;
  }

  //get all categories from sighting_categories table
  async getCategoriesFromAllSightings(req, res) {
    try {
      const allSightingsCategories = await this.sightingCategoryModel.findAll();
      return res.json(allSightingsCategories);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // retrieve categories from single sighting
  async getCategoriesFromSighting(req, res) {
    const { sightingId } = req.params;
    try {
      const categories = await this.sightingCategoryModel.findAll({
        where: {
          sighting_id: sightingId,
        },
      });
      console.log(categories);
      return res.json(categories);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // add category to categories
  async insertOne(req, res) {
    const { name } = req.body;
    try {
      const newCategory = await this.model.create({
        name: name,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return res.json(newCategory);
    } catch (err) {
      console.log(err);
      return res.status(404).json({ error: true, msg: err });
    }
  }
}

module.exports = CategoriesController;
