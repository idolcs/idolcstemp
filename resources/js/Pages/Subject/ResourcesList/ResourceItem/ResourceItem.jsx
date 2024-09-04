import { Link } from "@inertiajs/react";
import YoutubeLogo from "../../../../../../public/assets/youtube.svg";

const ResourceItem = ({ resource }) => {
    return (
        <>
            <Link
                style={{
                    background: "rgb(217,217,217)",
                    background:
                        "linear-gradient(12deg, rgba(217,217,217,0.1) 0%, rgba(0,212,255,0) 50%)",
                }}
                className="block p-3 border border-[#535353] rounded-lg mt-2"
                href={""}
            >
                <div className="flex">
                    {resource.type == "youtube" ? (
                        <div className="pr-2 flex flex-shrink-0 items-center">
                            <img
                                className="h-[1.5em]"
                                src={YoutubeLogo}
                                alt=""
                            />
                        </div>
                    ) : null}
                    <p>{resource.title}</p>
                </div>

                <p className="text-[0.7em] mt-1 opacity-50">{resource.date}</p>
            </Link>
        </>
    );
};

export default ResourceItem;
