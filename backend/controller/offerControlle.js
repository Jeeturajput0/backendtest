const Offer = require("../model/offerModel");

const create = async (req, res) => {
  try {
    const { name, discount, status } = req.body;

    const offer = await Offer.create({
      name,
      discount,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Offer created successfully",
      data: offer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Offer creation failed",
      error: error.message,
    });
  }
};


const list = async (req, res) => {
  try {
    const offers = await Offer.find();

    res.status(200).json({
      success: true,
      data: offers,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const details = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.offer_id);

    res.status(200).json({
      success: true,
      message: "Offer details fetched successfully",
      data: offer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Offer details failed",
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndUpdate(req.params.offer_id, req.body, {
      new: true,
     
    });


    res.status(200).json({
      success: true,
      message: "Offer updated successfully",
      data: offer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Offer update failed",
      error: error.message,
    });
  }
};

const destory = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndDelete(req.params.offer_id);

 

    res.status(200).json({
      success: true,
      message: "Offer deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Offer delete failed",
      error: error.message,
    });
  }
};

module.exports = {
  create,
  list,
  details,
  update,
  destory,
};
