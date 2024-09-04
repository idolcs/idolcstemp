import whatsappLogo from "../../../../../public/assets/whatsapp.svg";
import telegramLogo from "../../../../../public/assets/telegram.svg";
import githubLogo from "../../../../../public/assets/github.svg";
import { Link } from "@inertiajs/react";

const JoinCommunity = () => {
    const socials = [
        {
            icon: whatsappLogo,
            target: "",
        },
        {
            icon: telegramLogo,
            target: "",
        },
        {
            icon: githubLogo,
            target: "",
        },
    ];

    return (
        <>
            <div className="my-8">
                <p className="font-bold">Join the Community</p>
                <div className="flex mt-4">
                    {socials.map((sm) => {
                        return (
                            <Link href={sm.target}>
                                <img className="h-[2.2em] mr-2" src={sm.icon} alt="" />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default JoinCommunity;
