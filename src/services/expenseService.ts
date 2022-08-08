import { User, Expense, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import _ from "lodash";

export interface ExpensePayload {
  title: string;
  description?: string;
  cost: number;
  date: Date;
  category: string;
}

export default class ExpenseService {
  static async createNew(
    expense: any,
    user: User
  ): Promise<Expense> {
    // Save the expense to db
    const newExpense = await prisma.expense.create({
      data: {
        ...expense,
        category: { connect: { id: expense.category } },
        user: { connect: { id: user.id } },
      },
    });

    return newExpense;
  }

  static async getAll(user: User, category?: string, populate = false): Promise<Array<Expense>> {
    // Get all expenses for a given user
    const expenses = await prisma.expense.findMany({
      where: {
        user: { id: user.id },
        category: { id: category },
      },
      include: { category: populate },
    });

    return expenses;
  }

  static async update(id: string, expense: any): Promise<Expense> {
    // Get the original expense from db
    const originalExpense = await prisma.expense.findFirst({
      where: { id: id },
    });

    // Check if the expense even exists
    if (!originalExpense) throw "Expense does not exist.";

    // Apply changes from expense to originalExpense
    let update = {
      ...originalExpense,
      ...expense,
    };
    update = _.omit(update, ["id"]);

    console.log(update);

    // Update the expense in db
    // Only those fields that are provided will be updated
    const updatedExpense = await prisma.expense.update({
      where: { id },
      data: update,
    });

    return updatedExpense;
  }

  static async delete(id: string): Promise<Expense> {
    // Delete the expense from db
    const deletedExpense = await prisma.expense.delete({
      where: { id },
    });

    // Check if the expense even exists
    if (!deletedExpense) throw "Expense does not exist.";

    return deletedExpense;
  }
}
