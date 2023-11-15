import Image from "next/image";
import Post from "../components/post";

export default function Monfeed() {
    return (
        <main className="flex w-full">
            <div className="h-full w-full">
                <h1 className="text-4xl font-bold dark:text-white">Bienvenue sur votre feed</h1>
                <div className="max-w-[800px] justify-center mx-auto">
                    <Post title="Star Wars" description="Star Wars Prequels" mediaUrl="/Star-Wars-Prequels.jpg" />
                </div>
            </div>
        </main>
    );
}
