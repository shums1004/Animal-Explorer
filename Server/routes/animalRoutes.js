const { Router } = require('express');
const { createAnimal, getAnimalData, getAnimalById } = require('../controllers/animalController');
const{authenticateToken} = require('../controllers/userController.js');
const express = require('express');

const router = express.Router();

router.post('/create', createAnimal); 
router.get('/getanimals', getAnimalData, authenticateToken);  
router.get('/getanimalsById',getAnimalById, authenticateToken);  

module.exports = router;