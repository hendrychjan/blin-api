import express, { Response } from "express";
import { auth } from "../middleware/auth";
import ExpenseService, { ExpensePayload } from "../services/expenseService";
const router = express.Router();

// @route   GET expenses
// @desc    Get all user's expenses
// @access  Private
router.get("/", [auth], async (req: any, res: Response) => {
  try {
    const categories = await ExpenseService.getAll(
      req.user,
      req.query.category,
      req.query.populate,
    );
    res.status(200).send(categories);
  } catch (e) {
    res.status(400).send(e);
  }
});

// @route   POST expenses
// @desc    Create a new expense
// @access  Private
router.post("/", [auth], async (req: any, res: Response) => {
  try {
    const category = await ExpenseService.createNew(
      req.body as ExpensePayload,
      req.user
    );
    res.status(201).send(category);
  } catch (e) {
    res.status(400).send(e);
  }
});

// @route   PUT expenses/:id
// @desc    Update an expense
// @access  Private
router.put("/:id", [auth], async (req: any, res: Response) => {
  try {
    const updatedExpense = await ExpenseService.update(req.params.id, req.body);
    res.status(200).send(updatedExpense);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

// @route   DELETE expenses/:id
// @desc    Delete an expense
// @access  Private
router.delete("/:id", [auth], async (req: any, res: Response) => {
  try {
    const deletedExpense = await ExpenseService.delete(req.params.id);
    res.status(200).send(deletedExpense);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
