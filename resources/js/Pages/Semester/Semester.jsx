import MainWrapper from "../../Layout/MainWrapper";
import SemesterSelector from "./SemesterSelector/SemesterSelector";
import SemUpdates from "./SemUpdates/SemUpdates";
import SubjectSelector from "./SubjectSelector/SubjectSelector";

const Semester = ({semNumber, subjects, activeSemesters}) => {
    return (
        <>
            <SemesterSelector activeSemesters={activeSemesters} semNumber={semNumber} />
            <SubjectSelector subjects={subjects} />
            <SemUpdates semNumber={semNumber} />
        </>
    )
}

Semester.layout = page => <MainWrapper children={page} />
export default Semester;