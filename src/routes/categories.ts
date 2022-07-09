import express, { Response } from "express";
import { auth } from "../middleware/auth";
import Category, { TCategory } from "../models/category";
const router = express.Router();

// @route   POST categories
// @desc    Create a new category
// @access  Private
router.post("/", [auth], async (req: any, res: Response) => {
  const category = await Category.createNew({...req.body, user: req.user._id} as TCategory);
  res.status(201).send(category);
});

// @route   GET categories
// @desc    Get all user's categories
// @access  Private
router.get("/", [auth], async (req: any, res: Response) => {
  const categories = await Category.getAllCategories(req.user._id);
  res.status(200).send(categories);
});

// @route   PUT categories/:id
// @desc    Update a category
// @access  Private
router.put("/:id", [auth], async (req: any, res: Response) => {
  const updatedCategory = await Category.updateCategory(req.params.id, req.body, req.user._id);
  res.status(200).send(updatedCategory);
});

// @route   DELETE categories/:id
// @desc    Delete a category
// @access  Private
router.delete("/:id", [auth], async (req: any, res: Response) => {
  const deletedCategory = await Category.deleteCategory(req.params.id, req.user._id);
  res.status(200).send(deletedCategory);
});

module.exports = router;
