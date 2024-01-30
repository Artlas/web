import { Category, Subcategory } from "../../types/category";
import { fetchAllCategories } from "../pages/api/categoryAPI";
export function getRandomInt() {
    let min = 0,
        max = 10000;
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

export async function getAllCategories(): Promise<{ categories: Category[] }> {
    try {
        const response = await fetchAllCategories();
        const categoriesRetrieved = response; // Clean code
        const arrangedCategories = categoriesRetrieved.map((category: Category) => ({
            _id: category.id, // Use _id instead of id
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
