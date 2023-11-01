// const fs = require('fs'); file system

const Tour = require('../models/tourModel');
const apiFeatures = require('../Utilities/apiFeatures');


//prefilling the queryString for the user to get top-5
exports.aliasTopTours = (req, res, next) =>{
  req.query.limit = '5';
  req.query.sort = '-rating, price';
  req.query.fields ='name, rating, price';
  next();

}

//2) Route Handlers
exports.GetAllTours = async (req, res) => {
  try{
    

     const features = new apiFeatures(Tour.find(), req.query)
     .filter().sort().limitFields().paginate();
      const tours = await features.query;
     

     res.status(200).json(
      {
        status: 'success',
        Data:{
          tours
        }
      }
     )
  }catch(err) {
    res.status(404).json({
      status: 'error',
      message: err
    });
  }
};

exports.CreatTour = async ( req, res) => {
  try {
    // const newTour = new Tour(req.body);
    // await newTour.save();
    const newtour = await Tour.create(req.body )
    res.status(201).json({
      Status: 'success',
      data: {
        tour: newtour
      }
    })
  }
  catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Creating new tour failed',
      err,
    });
  }
};


exports.GetTour = async (req, res) => {
  try{
    const tour =  await Tour.findById(req.params.id);
    console.log(tour);
    res.status(200).json({
      status: 'success',
      Data: {
        tour
      }
    })
  }catch(err){
    console.log('error :', err);
  }
};

exports.UpdateTour = async (req, res) => {
  try{
    const newData = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new : true
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour: newData
    }});
  }
  catch(err){
     res.status(404).json({
      status: 'failed',
      messgae : "Can't update data"
     })
  }
};

exports.DeleteTour = (req, res) => {
  //204 is a status code wich means no content
  try{
    Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      message: 'Tour deleted successfully'
    })
  }catch(err){
  res.status(204).json({
    status: 'success',
    data: err
  });
}
}
