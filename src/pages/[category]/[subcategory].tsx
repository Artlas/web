import { CategoryContext } from "@/src/components/categoryContext";
import { useRouter } from "next/router";
import { useContext } from "react";
import { fetchCategories } from "@/src/utils/categoriesHandler";

const SubCategoryPage = () => {
    const router = useRouter();
    const { categoryList, categoryNameList, subCategoryList, subCategoryNameList, setCategory } = useContext(CategoryContext);

    const { category, subcategory } = router.query;

    // Utilisez 'category' et 'subcategory' pour récupérer les données correspondantes

    return (
        <div>
            <h1>
                Sous-catégorie {subcategory} de la catégorie {category}
            </h1>
            {/* Affichez vos articles ici */}
        </div>
    );
};
export async function getStaticPaths() {
    const categoryList = await fetchCategories();

    const paths = categoryList.flatMap((category) => {
        return category.subcategories.map((subcategory) => {
            return { params: { category: category.name, subcategory: subcategory.name } };
        });
    });

    // Set fallback to true
    return { paths, fallback: true };
}

export async function getStaticProps({ params }: any) {
    const categoryList = await fetchCategories();

    // Find the category
    const category = categoryList.find((category) => category.name === params.category);

    // Check if the category exists and the subcategory is in this category's subcategories
    const categoryExists = Boolean(category);
    const subcategoryExists = category?.subcategories.some((sub) => sub.name === params.subcategory) || false;

    if (!categoryExists || !subcategoryExists) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            // props for your component
        },
    };
}
export default SubCategoryPage;
