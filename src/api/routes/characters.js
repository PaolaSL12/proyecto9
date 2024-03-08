const { postAllCharacters } = require("../controllers/characters");

const characterRouter = require("express").Router();

characterRouter.post("/insert", postAllCharacters);

module.exports = characterRouter;