import { useRouter } from "next/router";

const SubCategoryPage = () => {
    const router = useRouter();
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

export default SubCategoryPage;
