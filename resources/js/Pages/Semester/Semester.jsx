import MainWrapper from "../../Layout/MainWrapper";
import SemesterSelector from "./SemesterSelector/SemesterSelector";
import SubjectSelector from "./SubjectSelector/SubjectSelector";

const Semester = ({semNumber}) => {
    return (
        <>
            <SemesterSelector semNumber={semNumber} />
            <SubjectSelector />
        </>
    )
}

Semester.layout = page => <MainWrapper children={page} />
export default Semester;