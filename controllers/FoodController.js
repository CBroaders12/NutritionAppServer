const { Router, response } = require('express');
const { Food } = require('../models');

const FoodController = Router();

FoodController.route('/')
  .get(async (req, res) => {
    try {
      const foodItems = await Food.findAll({
        where: {
          owner_id: req.user.id,
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
        servings,
        calories,
        date_eaten,
        meal,
        carbs_in_grams,
        fat_in_grams,
        protein_in_grams
      } = req.body;
      let newItem = await Food.create({
        name,
        servings,
        calories,
        date_eaten,
        meal,
        carbs_in_grams,
        fat_in_grams,
        protein_in_grams,
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
        servings,
        calories,
        date_eaten,
        carbs_in_grams,
        fat_in_grams,
        protein_in_grams,
        meal
      } = req.body;
      const toUpdate = await Food.findOne({
        where: {
          id: foodId,
          owner_id: userId
        },
      });
      if (toUpdate && name && servings && calories && date_eaten && meal) {
        toUpdate.name = name;
        toUpdate.servings = servings;
        toUpdate.calories = calories;
        toUpdate.date_eaten = date_eaten;
        toUpdate.meal = meal;
        toUpdate.carbs_in_grams = carbs_in_grams;
        toUpdate.fat_in_grams = fat_in_grams;
        toUpdate.protein_in_grams = protein_in_grams;
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