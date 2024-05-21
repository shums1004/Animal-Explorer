const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    endangeredLevel: { type: Number, required: true },
    image: { type: String, required: true },
    info: { type: String, required: true },
    exactLocation:[{latitude: { type: Number }, longitude: { type: Number }}],
    behaviorPattern: { type: String }
});

 module.exports = mongoose.model('Animal', animalSchema);
