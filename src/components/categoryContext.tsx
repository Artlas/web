import React, { createContext, useState, useEffect } from "react";
import { fetchCategories, fetchSubCategories } from "../utils/categoriesHandler"; // Remplacez par vos propres fonctions d'API
import { Category, Subcategory } from "../../types/category";
interface CategoryContextState {
    categoryList: Category[];
    categoryNameList: string[];
    subCategoryList: Subcategory[];
    subCategoryNameList: string[];
    setCategory: (categoryName: string) => void;
    setSubCategoryList: (subCategories: Subcategory[]) => void;
}

export const CategoryContext = createContext<CategoryContextState>({
    categoryList: [],
    categoryNameList: [],
    subCategoryList: [],
    subCategoryNameList: [],
    setCategory: () => {},
    setSubCategoryList: () => {},
});

// ...

export const CategoryProvider: React.FC = ({ children }: any) => {
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [categoryNameList, setCategoryNameList] = useState<string[]>([]);
    const [subCategoryList, setSubCategoryList] = useState<Subcategory[]>([]);
    const [subCategoryNameList, setSubCategoryNameList] = useState<string[]>([]);

    useEffect(() => {
        fetchCategories().then((categories) => {
            setCategoryList(categories);
            setCategoryNameList(categories.map((category) => category.name));
        });
    }, []);

    const setCategory = async (categoryName: string) => {
        const category = categoryList.find((category) => category.name === categoryName);
        if (category) {
            setSubCategoryList(category.subcategories);
            setSubCategoryNameList(category.subcategories.map((subCategory) => subCategory.name));
        }
    };

    return <CategoryContext.Provider value={{ categoryList, categoryNameList, subCategoryList, subCategoryNameList, setCategory, setSubCategoryList }}>{children}</CategoryContext.Provider>;
};
