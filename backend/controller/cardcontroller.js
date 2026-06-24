const { json } = require("express");
const card = require("../model/cardmodel");

const getcard = async (req, res) => {
  try {
    console.log("GET API hit");

    const cards = await card.find();
    console.log(cards);

    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
const createcard = async (req, res) => {
  try {
    console.log(req.body);

    const { title, description } = req.body;

    const newCard = await card.create({
      title,
      description,
    });

    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updatecard = async (req, res) => {
  try {
  

    const newCard = await card.findByIdAndUpdate(id.params.category_Id,
      res.body,)

    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports={getcard,createcard,updatecard }