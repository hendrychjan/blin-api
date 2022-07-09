import { Types, Schema, InferSchemaType, model, Model } from "mongoose";

// Category object data schema
const categorySchema = new Schema({
  name: String,
  description: String,
  user: Types.ObjectId,
  color: String,
});

// Instance methods for Category
interface ICategoryMethods {}

// Static methods for Category
interface IStaticMethods {
  checkIfNameIsUnique(categoryName: string, userId: any): Promise<boolean>;
  createNew(category: TCategory): Promise<any>;
  getAllCategories(userId: any): Promise<any>;
  updateCategory(id: typeof Types.ObjectId, update: TCategory, userId: any): Promise<any>;
  deleteCategory(id: typeof Types.ObjectId, userId: any): Promise<any>;
}

// Bussiness logic methods

// Check if a name of a category is unique
categorySchema.static(
  "checkIfNameIsUnique",
  async function checkIfNameIsUnique(
    categoryName: string,
    userId: any
  ): Promise<boolean> {
    const category = await Category.findOne({
      name: categoryName,
      user: userId,
    });
    return !category;
  }
);

// Create new category
categorySchema.static(
  "createNew",
  async function createNew(category: TCategory): Promise<any> {
    const newCategory = new Category(category);
    const isUnique = await Category.checkIfNameIsUnique(
      category.name!,
      category.user!
    );
    if (isUnique) {
      await newCategory.save();
      return newCategory;
    } else {
      throw new Error("Category name is not unique");
    }
  }
);

// Get all categories
categorySchema.static(
  "getAllCategories",
  async function getAllCategories(userId: any): Promise<Array<TCategory>> {
    const categories = await Category.find({ user: userId });
    return categories;
  }
);

// Update a category
categorySchema.static(
  "updateCategory",
  async function updateCategory(id: typeof Types.ObjectId, update: TCategory, userId: any): Promise<any> {
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: id, user: userId },
      update,
      { new: true }
    );
    return updatedCategory;
  }
);

// Delete a category
categorySchema.static(
  "deleteCategory",
  async function deleteCategory(id: typeof Types.ObjectId, userId: any): Promise<any> {
    const deletedCategory = await Category.findOneAndDelete({ _id: id, user: userId });
    return deletedCategory;
  }
);

// Generate mongodb models for the category collection
export type TCategory = InferSchemaType<typeof categorySchema>;
const Category = model<
  TCategory,
  Model<TCategory, {}, ICategoryMethods> & IStaticMethods
>("Category", categorySchema);

export default Category;
