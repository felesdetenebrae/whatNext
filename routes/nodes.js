var express = require("express");
var router = express.Router();
var models = require("../models");

// creates a node (without edges)
router.post("/", async function (req, res) {
    try {
       const {situation, media, StoryId} = req.body;
       const node = await models.Node.create({situation, media, StoryId})

       res.send({id:node.dataValues.id})
       

    } catch (error) {
      res.status(500).send(error);
    }

});


router.put("/:id/edges", async function (req, res) {
    try {
        const {id} = req.params;  // ID of parent node
        const children = [];

        for (object of req.body){
            const {situation, media, StoryId, option} = object;
            const node = await models.Node.create({situation, media, StoryId});
            
            await node.addNext(id, {through: { option: option }})

            children.push(node.dataValues.id)
        }

       res.send(children)
       

    } catch (error) {
      res.status(500).send(error);
    }

});



module.exports = router;