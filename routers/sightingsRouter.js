const express = require("express");
const router = express.Router();

class SightingsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    // we will insert routes into here later on
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get("/:sightingId", this.controller.getOne.bind(this.controller));
    router.post("/", this.controller.insertOne.bind(this.controller));
    router.put("/:sightingId", this.controller.updateOne.bind(this.controller));
    router.get(
      "/:sightingId/comments",
      this.controller.getComments.bind(this.controller)
    );
    router.post(
      "/:sightingId/comments",
      this.controller.addComment.bind(this.controller)
    );
    router.put(
      "/:sightingId/comments",
      this.controller.updateComments.bind(this.controller)
    );
    router.get(
      "/:sightingId/likes",
      this.controller.getLikes.bind(this.controller)
    );
    router.post(
      "/:sightingId/likes",
      this.controller.addLikes.bind(this.controller)
    );

    return router;
  }
}

module.exports = SightingsRouter;
