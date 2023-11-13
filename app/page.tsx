import Image from "next/image";
import Post from "@/components/post";

export default function Home() {
    return (
        <main className="flex w-full">
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
