const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model) {
    super(model);
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
    const { date, location, notes } = req.body;
    try {
      const newSighting = await this.model.create({
        date: date,
        location: location,
        notes: notes,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return res.json(newSighting);
    } catch (err) {
      console.log(err);
      return res.status(404).json({ error: true, msg: err });
    }
  }
  //update/edit sighting
  async updateOne(req, res) {
    const { sightingId } = req.params;
    const { date, location, notes } = req.body;
    try {
      const sighting = await this.model.findByPk(sightingId);
      await sighting.update({
        date: date,
        location: location,
        notes: notes,
        updatedAt: new Date(),
      });
      await sighting.save();
      return res.json(sighting);
    } catch (err) {
      console.log(err);
      return res.status(404).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
