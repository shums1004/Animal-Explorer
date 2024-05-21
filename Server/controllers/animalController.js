const Animal = require('../models/animalModel');
// const authenticateToken = require('./userController').authenticateToken;

async function createAnimal(req, res){
    try{
        const { name, category, endangeredLevel, image, info, exactLocation, behaviorPattern } = req.body;
        const latitude = parseFloat(exactLocation.latitude);
        const longitude = parseFloat(exactLocation.longitude);
        const newAnimal = new Animal({
            name,
            category,
            endangeredLevel,
            image,
            info,
            exactLocation: { latitude, longitude},
            behaviorPattern
        });
        await newAnimal.save();
        res.status(200).json({ message: "Animal Uploaded Successfully" });
    }
    catch(e){
        res.status(400).json({ message: e.message });
    }
}

async function getAnimalData(req, res){
    console.log("inside getAnimalData");
    const { sortBy, category, endangeredLevel, search } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (endangeredLevel) filter.endangeredLevel = { $gte: endangeredLevel };
    if (search) filter.name = new RegExp(search, 'i');
    console.log("step 1");
    try {
        let animals = await Animal.find(filter).sort(sortBy ? { [sortBy]: 1 } : {});
        console.log("step 2");
        if (!req.user.isVerified) {
            animals = animals.map(animal => {
                const { exactLocation, behaviorPattern, ...publicData } = animal.toObject();
                return publicData;
            });
        }
        res.send(animals);
    } catch (err) {
        res.status(400).send(err);
    }
}

async function getAnimalById(req, res){
    try {
        const animal = await Animal.findById(req.params.id);
        if (!animal) return res.status(404).send('Animal not found');
        
        if (!req.user.isVerified) {
            const { exactLocation, behaviorPattern, ...publicData } = animal.toObject();
            return res.send(publicData);
        }
        res.send(animal);
    } catch (err) {
        res.status(400).send(err);
    }
}

module.exports = { createAnimal, getAnimalData, getAnimalById};