import MainWrapper from "../../Layout/MainWrapper";
import NotesList from "./NotesList/NotesList";
import ResourcesList from "./ResourcesList/ResourcesList";
import SubjectSelector from "./SubjectSelector/SubjectSelector";

const Subject = ({name}) => {
    return (
        <>
            <p className="opacity-70">Semester 1</p>
            <SubjectSelector name={name} />
            <NotesList />
            <ResourcesList />
        </>
    )
}

Subject.layout = page => <MainWrapper children={page} />
export default Subject;