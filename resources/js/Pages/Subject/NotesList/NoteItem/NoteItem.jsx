import { Link } from "@inertiajs/react";

const NoteItem = ({note}) => {
    return (
        <>
            <Link
                style={{
                    background: "rgb(217,217,217)",
                    background:
                        "linear-gradient(12deg, rgba(217,217,217,0.1) 0%, rgba(0,212,255,0) 50%)",
                }}
                className="block p-3 border border-[#535353] rounded-lg mt-2"
                href={"/note"}
            >
                {note.title}
                
                {note.description ? (<p className="text-[0.8em] opacity-70">{note.description}</p>) : ""}

                <p className="text-[0.7em] mt-1 opacity-50">{note.date}</p>

            </Link>
        </>
    )
}

export default NoteItem;