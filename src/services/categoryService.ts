import { User, Category, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export interface CategoryPayload {
  name: string;
  description?: string;
  color: string;
}

export default class CategoryService {
  static async createNew(
    category: CategoryPayload,
    user: User
  ): Promise<Category> {
    // Check if the name is unique for a given user
    const duplicateCategory = await prisma.category.findFirst({
      where: {
        name: category.name,
        user: { id: user.id },
      },
    });

    if (duplicateCategory) {
      throw "Category name is not unique";
    }

    // Save the category to db
    const newCategory = await prisma.category.create({
      data: {
        ...category,
        user: { connect: { id: user.id } },
      },
    });

    // Return the new category
    return newCategory;
  }

  static async getAll(user: User): Promise<Array<Category>> {
    // Get all categories for a given user
    const categories = await prisma.category.findMany({
      where: {
        user: { id: user.id },
      },
    });

    // Return the result
    return categories;
  }

  static async update(
    id: string,
    category: CategoryPayload,
    user: User
  ): Promise<Category> {
    // Check if the name is unique for a given user
    const duplicateCategory = await prisma.category.findFirst({
      where: {
        name: category.name,
        user: { id: user.id },
      },
    });

    if (duplicateCategory) {
      throw "Category name is not unique";
    }

    // Update the category in db
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { ...category },
    });

    // Return the updated category
    return updatedCategory;
  }

  static async delete(id: string): Promise<Category> {
    // Delete the category from db
    const deletedCategory = await prisma.category.delete({
      where: { id },
    });

    // Return the deleted category
    return deletedCategory;
  }
}
