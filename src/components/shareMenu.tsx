import { useEffect, useState, useRef } from "react";
import ListElement from "./listElement";
import { EmailShareButton, FacebookShareButton, TwitterShareButton } from "react-share";
import { FaLink, FaFacebook, FaTwitter } from "react-icons/fa6";
import { MdAttachEmail } from "react-icons/md";

const ShareComponent = ({ postLink, isOpen, x, y }: { postLink: string; isOpen: boolean; x: number; y: number }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(isOpen);
    const catMenu = useRef(null);
    const handleCopyLinkButtonClick = () => {
        navigator.clipboard.writeText(postLink);
        // You can also show a success message or perform any other action here
        console.log("Link copied to clipboard");
    };

    const [coords, setCoords] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setIsMenuOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
        !isMenuOpen && setCoords({ x, y });
    }, [isMenuOpen, x, y]);

    const closeOpenMenus = (e: Event) => {
        if (typeof document !== "undefined" && isMenuOpen && catMenu.current && !(catMenu.current as HTMLElement).contains(e.target as Node)) {
            setIsMenuOpen(false);
        }
    };

    if (typeof document !== "undefined") {
        document.addEventListener("mousedown", closeOpenMenus);
    }

    return (
        isMenuOpen && (
            <div
                style={{ top: `${coords.y - 70}px`, left: `${coords.x - 300}px` }}
                className={
                    "fixed  flex flex-col p-1 mt-2 bg-stone-100 dark:bg-stone-950 text-black dark:text-white rounded-md border-2 border-solid border-stone-200 dark:border-stone-800 z-50 overflow-hidden"
                }
                ref={catMenu}
            >
                <ListElement icon={<FaLink size={16} className="inline mr-2" />} label="Copier le lien" onClick={handleCopyLinkButtonClick} smallFont />
                <EmailShareButton subject="Regardez ce post sur Artlas !" body="Regardez ce post : " url={postLink}>
                    <ListElement icon={<MdAttachEmail size={16} className="inline mr-2" />} label="Partager par mail" smallFont />
                </EmailShareButton>
                <FacebookShareButton url={postLink}>
                    <ListElement icon={<FaFacebook size={16} className="inline mr-2" />} label="Partager sur Facebook" smallFont />
                </FacebookShareButton>
                <TwitterShareButton url={postLink}>
                    <ListElement icon={<FaTwitter size={16} className="inline mr-2" />} label="Partager sur Twitter" hideBar smallFont />
                </TwitterShareButton>
            </div>
        )
    );
};

export default ShareComponent;
