const { Router } = require('express');
const { Food } = require('../models');

const FoodController = Router();

FoodController.route('/')
  .get(async (req, res) => {
    try {
      const foodItems = await Food.findAll({
        where: {
          owner_id: req.user.id,
          date_eaten: req.body.date_eaten,
        },
      });
      if (foodItems) {
        res.status(200).json({
          result: foodItems,
        });
      } else {
        res.status(404).json({
          message: "No entries found for user",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Failed to retrieve entries for user"
      });
    }
  })
  .post(async (req, res) => {
    try {
      const {
        name,
        description,
        servings,
        calories,
        date_eaten,
        meal
      } = req.body;
      let newItem = await Food.create({
        name,
        description,
        servings,
        calories,
        date_eaten,
        meal,
        owner_id: req.user.id,
      });
      res.json({
        message: "Food entry created",
        entry: newItem,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Failed to create entry",
      });
    }
  });

module.exports = FoodController;