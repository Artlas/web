import Image from "next/image";
import Post from "@/components/post";

export default function Home() {
    return (
        <main className="flex rounded-tl-3xl  border-l-2 border-t-2 border-black dark:border-white h-full w-full p-8">
            <div className="h-full w-full">
                <h1 className="text-4xl font-bold dark:text-white">Bienvenue sur Artlas</h1>
                <div className="max-w-[800px] justify-center mx-auto">
                    <Post title="Star Wars" description="Star Wars Prequels" mediaUrl="/Star-Wars-Prequels.jpg" />
                    <Post title="Star Wars" description="Star Wars Prequels" mediaUrl="/Star-Wars-Prequels.jpg" />
                    <Post title="Star Wars" description="Star Wars Prequels" mediaUrl="/Star-Wars-Prequels.jpg" />
                </div>
            </div>
        </main>
    );
}
