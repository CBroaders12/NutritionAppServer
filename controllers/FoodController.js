const { Router, response } = require('express');
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

FoodController.route('/:id')
  .put(async (req, res) => {
    let foodId = req.params.id;
    let userId = req.user.id;

    try {
      const {
        name,
        description,
        servings,
        calories,
        date_eaten,
        meal
      } = req.body;
      const toUpdate = await Food.findOne({
        where: {
          id: foodId,
          owner_id: userId
        },
      });
      if (toUpdate && name && description && servings && calories && date_eaten && meal) {
        toUpdate.name = name;
        toUpdate.description = description;
        toUpdate.servings = servings;
        toUpdate.calories = calories;
        toUpdate.date_eaten = date_eaten;
        toUpdate.meal = meal;
        await toUpdate.save();
        res.status(200).json({
          message: "Successfully updated food entry",
        });
      } else {
        res.status(404).json({
          message: "Entry information missing, entry not found, or user unauthorized to edit"
        });
      }
    } catch (error) {
      console.log(error);
      response.status(500).send( { message: "failed to update entry" } )
    }
  })
  .delete(async (req, res) => {
    let foodId = req.params.id;
    let userId = req.user.id;

    try {
      const toRemove = await Food.findOne({
        where: {
          id: foodId,
          owner_id: userId,
        },
      });
      toRemove
        ? toRemove.destroy()
        : res.status(404).json({
          message: "Entry not found or entry does not belong to user",
        });
      res.status(200).json({
        message: "Successfully removed entry",
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to delete entry",
      });
    }
  });

module.exports = FoodController;