import express, { Response } from "express";
import { auth } from "../middleware/auth";
import CategoryService, { CategoryPayload } from "../services/categoryService";
const router = express.Router();

// @route   POST categories
// @desc    Create a new category
// @access  Private
router.post("/", [auth], async (req: any, res: Response) => {
  try {
    const category = await CategoryService.createNew(
      req.body as CategoryPayload,
      req.user
    );
    res.status(201).send(category);
  } catch (e) {
    res.status(400).send(e);
  }
});

// @route   GET categories
// @desc    Get all user's categories
// @access  Private
router.get("/", [auth], async (req: any, res: Response) => {
  try {
    const categories = await CategoryService.getAll(req.user);
    res.status(200).send(categories);
  } catch (e) {
    res.status(400).send(e);
  }
});

// @route   PUT categories/:id
// @desc    Update a category
// @access  Private
router.put("/:id", [auth], async (req: any, res: Response) => {
  try {
    const updatedCategory = await CategoryService.update(
      req.params.id,
      req.body as CategoryPayload,
      req.user
    );
    res.status(200).send(updatedCategory);
  } catch (e) {
    res.status(400).send(e);
  }
});

// @route   DELETE categories/:id
// @desc    Delete a category
// @access  Private
router.delete("/:id", [auth], async (req: any, res: Response) => {
  try {
    const deletedCategory = await CategoryService.delete(req.params.id);
    res.status(200).send(deletedCategory);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
