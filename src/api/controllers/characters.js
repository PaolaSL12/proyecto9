const Character = require("../models/character");
allCharacters = require("../../../characters.json")

const postAllCharacters = async (req, res, next) => {
    try {
        await Character.insertMany(allCharacters)
        return res.status(201).json("subidos correctamente")
    } catch (error) {
        return res.status(400).json("ha salido mal")
    }
}

module.exports = { postAllCharacters }