import { Link } from "@inertiajs/react";
import MainWrapper from "../../Layout/MainWrapper";
import NotePDF from "./NotePDF/NotePDF";

const Note = ({note, subject}) => {

    return (
        <>
            <p className="opacity-70"><Link href={`/${note.semester}`}>Semester {note.semester}</Link> / <Link href={`/${subject.code}`}>{subject.name}</Link></p>
            <p className="font-bold text-[1.5em] mt-4">{note.title}</p>
            <p>{note.description}</p>
            <div className="h-6 w-2"></div>
           <NotePDF url={note.file} /> 
        </>
    )
}

Note.layout = page => <MainWrapper children={page} />;
export default Note;