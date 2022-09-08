const category = require("../db/models/category");
const BaseController = require("./baseController");
const sequelize = require("sequelize");

class SightingsController extends BaseController {
  constructor(model, commentModel, likesModel, sightingCategoryModel) {
    super(model);
    this.commentModel = commentModel;
    this.likesModel = likesModel;
    this.sightingCategoryModel = sightingCategoryModel;
  }

  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId);
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
  // add sighting
  async insertOne(req, res) {
    console.log(req.body);
    const { date, location, notes, categories } = req.body;
    try {
      const newSighting = await this.model.create({
        date: date,
        location: location,
        notes: notes,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log(categories);
      const newSightingCategories = categories.forEach((category) => {
        let newSightingCategory = this.sightingCategoryModel.create({
          sightingId: newSighting.id,
          categoryId: category.value,
        });
      });
      return res.json(newSighting);
      // return res.json(newSightingCategory);
    } catch (err) {
      console.log(err);
      return res.status(404).json({ error: true, msg: err });
    }
  }
  //update/edit sighting
  async updateOne(req, res) {
    const { sightingId } = req.params;
    const { date, location, notes, categories, categoryCount, selectedCount } =
      req.body;
    console.log(req.body);
    try {
      const sighting = await this.model.findByPk(sightingId);
      await sighting.update({
        date: date,
        location: location,
        notes: notes,
        updatedAt: new Date(),
      });
      await sighting.save();

      //if sighting has no prior category, add category (for seeded data)
      if (selectedCount > 0)
        await this.sightingCategoryModel.destroy({
          where: {
            sightingId: sightingId,
          },
        });
      const updatedCategories = categories.forEach((category) => {
        let cat = this.sightingCategoryModel.create({
          categoryId: category.value,
          sightingId: sightingId,
        });
      });

      return res.json(sighting);
    } catch (err) {
      console.log(err);
      return res.status(404).json({ error: true, msg: err });
    }
  }
  //get comments
  async getComments(req, res) {
    const { sightingId } = req.params;
    try {
      const comments = await this.commentModel.findAll({
        where: {
          sighting_id: sightingId,
        },
        order: sequelize.col("id"),
      });
      return res.json(comments);
    } catch (err) {
      console.log(err);
      return res.status(404).json({ error: true, msg: err });
    }
  }
  //add comment
  async addComment(req, res) {
    const sightingId = req.params.sightingId;
    console.log(req.params);
    console.log(req.body.content);
    const { content } = req.body;
    try {
      // const sighting = await this.model.findByPk(sightingId);
      const newComment = await this.commentModel.create({
        content: req.body.content,
        sightingId: req.params.sightingId,
        createdAt: new Date(),
      });
      await newComment.save();
      return res.json(newComment);
    } catch (err) {
      console.log(err);
      return res.status(404).json({ error: true, msg: err });
    }
  }
  // edit comment
  async updateComments(req, res) {
    const { commentId, content } = req.body;
    console.log(commentId);
    try {
      const comment = await this.commentModel.findByPk(commentId);
      await this.commentModel.update(
        {
          content: content,
          updatedAt: new Date(),
        },
        {
          where: {
            id: commentId,
          },
        }
      );
      await comment.save();
      res.json(comment);
    } catch (err) {
      console.log(err);
      return res.status(404).json({ error: true, msg: err });
    }
  }
  //get likes for sighting
  async getLikes(req, res) {
    const sightingId = req.params.sightingId;
    try {
      const totalLikes = await this.likesModel.findAll({
        where: { sighting_id: sightingId },
      });
      return res.json(totalLikes);
    } catch (err) {
      console.log(err);
      return res.status(404).json({ error: true, msg: err });
    }
  }
  //add likes to sighting
  async addLikes(req, res) {
    const sightingId = req.params.sightingId;
    try {
      const newLike = await this.likesModel.create({
        sightingId: req.params.sightingId,
        createdAt: new Date(),
      });
      await newLike.save();
      return res.json(newLike);
    } catch (err) {
      console.log(err);
      return res.status(404).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
