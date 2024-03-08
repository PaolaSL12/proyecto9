const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema ({
    name: { type: String, require: true},
    img: { type: String, require: true},
    description:{ type: String, require: true}
}, {
    collection: "characters"
})

const Character = mongoose.model("characters", characterSchema, "characters")
module.exports = Character