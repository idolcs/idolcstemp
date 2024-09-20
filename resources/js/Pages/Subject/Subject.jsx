import MainWrapper from "../../Layout/MainWrapper";
import NotesList from "./NotesList/NotesList";
import ResourcesList from "./ResourcesList/ResourcesList";
import SubjectSelector from "./SubjectSelector/SubjectSelector";

const Subject = ({name, subjects, semester}) => {
    
    return (
        <>
            <p className="opacity-70">Semester {semester}</p>
            <SubjectSelector name={name} subjects={subjects}/>
            <NotesList />
            <ResourcesList />
        </>
    )
}

Subject.layout = page => <MainWrapper children={page} />
export default Subject;