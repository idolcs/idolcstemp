import { Link } from "@inertiajs/react";

const UpdateLink = ({ title, target, date }) => {
    return (
        <>
            <Link
                style={{
                    background: "rgb(217,217,217)",
                    background:
                        "linear-gradient(12deg, rgba(217,217,217,0.1) 0%, rgba(0,212,255,0) 50%)",
                }}
                className="block p-3 border border-[#535353] rounded-lg mt-2"
                href={target}
            >
                {title}
                <p className="text-[0.7em] opacity-70">{date}</p>
            </Link>
        </>
    );
};

export default UpdateLink;
