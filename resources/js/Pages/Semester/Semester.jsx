import MainWrapper from "../../Layout/MainWrapper";
import SemesterSelector from "./SemesterSelector/SemesterSelector";
import SemUpdates from "./SemUpdates/SemUpdates";
import SubjectSelector from "./SubjectSelector/SubjectSelector";

const Semester = ({semNumber, subjects, activeSemesters, updates}) => {
    return (
        <>
            <SemesterSelector activeSemesters={activeSemesters} semNumber={semNumber} />
            <SubjectSelector subjects={subjects} />
            <SemUpdates semNumber={semNumber}  updates={updates}/>
        </>
    )
}

Semester.layout = page => <MainWrapper children={page} />
export default Semester;