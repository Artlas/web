import { getAllCategories } from "../utils/tools";

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
