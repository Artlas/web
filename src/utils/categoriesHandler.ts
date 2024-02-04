import { Category, Subcategory } from "../../types/category";
import { fetchAllCategoriesFromDB, fetchAllSubCategoriesFromCategoryFromDB } from "../api/categoryAPI";
export async function getAllCategories(): Promise<{ categories: Category[] }> {
    try {
        const response = await fetchAllCategoriesFromDB();
        const categoriesRetrieved = response;
        const arrangedCategories = categoriesRetrieved.map((category: Category) => ({
            id: category.id, // Use _id instead of id
            name: category.name,
            subcategories: category.subcategories.map((sub: Subcategory) => ({ name: sub.name, miniature: sub.miniature })), // Use subcategories instead of items
            miniatureLink: category.miniatureLink,
            isShown: category.isShown,
        }));
        return { categories: arrangedCategories };
    } catch (error) {
        console.log("Erreur lors du chanrgement des catégories ", error);
        return { categories: [] }; // Return an object with an empty categories array
    }
}
export const fetchCategories = async () => {
    const categories = await getAllCategories();

    const transformedCategories = categories.categories.map((category) => ({
        id: category.id,
        name: category.name,
        subcategories: category.subcategories,
        miniatureLink: category.miniatureLink,
        isShown: category.isShown,
    }));
    return transformedCategories;
};
export const fetchSubCategories = async (selectedCategoryName: string) => {
    const subCategories: Subcategory[] = await fetchAllSubCategoriesFromCategoryFromDB(selectedCategoryName);
    return subCategories;
};
