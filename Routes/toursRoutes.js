

//Modules
const express = require('express');
const tourController = require('../Controllers/tourController.js');
const router = express.Router();

//Top-chepest-tours
router.get('/top-5-tours').get(tourController.aliasTopTours,tourController.GetAllTours);


//Chaining method
router
  .route('/')
  .post(tourController.CreatTour)
  .get(tourController.GetAllTours)
router
  .route('/:id')
  .get(tourController.GetTour)
  .patch(tourController.UpdateTour)
  .delete(tourController.DeleteTour);


module.exports = router;