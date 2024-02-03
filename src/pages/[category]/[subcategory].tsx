import { CategoryContext } from "@/src/components/categoryContext";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { fetchCategories } from "@/src/utils/categoriesHandler";
import { Oeuvre } from "@/types/oeuvre";
import { getAllArt } from "@/src/api/artAPI";
import Post from "@/src/components/post";

const SubCategoryPage = () => {
    const router = useRouter();
    const [posts, setPosts] = useState<Oeuvre[]>([]);
    const { categoryList, categoryNameList, subCategoryList, subCategoryNameList, setCategory } = useContext(CategoryContext);

    const { category, subcategory } = router.query;

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllArt();
            let postToDisplay: Oeuvre[] = [];
            data.forEach((post: Oeuvre) => {
                if (post.category === category) {
                    if (subcategory === "all") {
                        postToDisplay.push(post);
                    } else if (post.subCategory === subcategory) {
                        postToDisplay.push(post);
                    }
                }
            });
            sortPostsByMostRecentPostDate(postToDisplay);
            setPosts(postToDisplay);
        };
        fetchData();
    }, [category, subcategory]);

    function sortPostsByMostRecentPostDate(posts: Oeuvre[]) {
        return posts.sort((a, b) => {
            if (typeof a.postDate === "string") {
                a.postDate = new Date(a.postDate);
            }
            if (typeof b.postDate === "string") {
                b.postDate = new Date(b.postDate);
            }
            return b.postDate.getTime() - a.postDate.getTime();
        });
    }

    return (
        <main className="flex w-full">
            <div className="h-full w-full">
                <div className="max-w-[800px] justify-center mx-auto">
                    {posts.map((post) => (
                        <Post key={post._id} {...post} />
                    ))}
                </div>
            </div>
        </main>
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
