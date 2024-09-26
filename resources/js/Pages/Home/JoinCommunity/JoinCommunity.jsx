import whatsappLogo from "../../../../../public/assets/whatsapp.svg";
import telegramLogo from "../../../../../public/assets/telegram.svg";
import githubLogo from "../../../../../public/assets/github.svg";
import { Link } from "@inertiajs/react";

const JoinCommunity = () => {
    const socials = [
        {
            icon: whatsappLogo,
            target: "https://chat.whatsapp.com/FdwxqYbVH1yBlu2tHxJvIG",
        },
        {
            icon: telegramLogo,
            target: "https://ttttt.me/idol_cs",
        },
        {
            icon: githubLogo,
            target: "https://github.com/idolcs",
        },
    ];

    return (
        <>
            <div className="my-8">
                <p className="font-bold">Join the Community</p>
                <div className="flex mt-4">
                    {socials.map((sm) => {
                        return (
                            <a href={sm.target}>
                                <img className="h-[2.2em] mr-2" src={sm.icon} alt="" />
                            </a>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default JoinCommunity;
