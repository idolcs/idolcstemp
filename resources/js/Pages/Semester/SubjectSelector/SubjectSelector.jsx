import SemesterButton from "../../Home/SelectSemester/SemesterButton/SemesterButton";

const SubjectSelector = ({subjects}) => {

    return (
        <>
            <div className="my-8">
                <p className="font-bold">Select Subject</p>
                <div>
                    {subjects.map((sub) => <SemesterButton title={sub.name} target={sub.code} />)}
                </div>
            </div>  
        </>
    )
}

export default SubjectSelector;