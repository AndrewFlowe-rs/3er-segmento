const express = require('express');
const router = express.Router();
const actorsController = require('../controllers/actorController');

router.get('/actors',actorsController.list);
router.get('/actors/detail/:id',actorsController.detail);
router.get('/actors/recommended',actorsController.recommendedA);


module.exports = router;