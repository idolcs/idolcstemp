import MainWrapper from "../../Layout/MainWrapper";
import NotePDF from "./NotePDF/NotePDF";

const Note = ({note}) => {

    console.log(note)

    return (
        <>
            <p className="opacity-70">Semester 1 / Programming with Python Algorithems</p>
            <p className="font-bold text-[1.5em] mt-4">Full Semester PDF</p>
            <p>{note.description}</p>
            <div className="h-6 w-2"></div>
           <NotePDF url={note.file} /> 
        </>
    )
}

Note.layout = page => <MainWrapper children={page} />;
export default Note;