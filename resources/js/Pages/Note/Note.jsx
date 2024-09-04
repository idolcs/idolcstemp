import MainWrapper from "../../Layout/MainWrapper";
import NotePDF from "./NotePDF/NotePDF";

const Note = () => {
    return (
        <>
            <p className="opacity-70">Semester 1 / Programming with Python Algorithems</p>
            <p className="font-bold text-[1.5em] my-4">Full Semester PDF</p>
           <NotePDF /> 
        </>
    )
}

Note.layout = page => <MainWrapper children={page} />;
export default Note;