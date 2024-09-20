import SemesterButton from "./SemesterButton/SemesterButton";

const SelectSemester = ({activeSemesters}) => {

    const semestersList = [];

    for(let i = 0; i < activeSemesters; i++){
        semestersList.push(<SemesterButton title={`Semester ${i + 1}`} target={`/${i+1}`} />)
    }

    return(
        <>
            <div className="my-8">
                <p className="font-bold">Select Your Semester</p>
                {semestersList}
            </div>
        </>
    )
}

export default SelectSemester;