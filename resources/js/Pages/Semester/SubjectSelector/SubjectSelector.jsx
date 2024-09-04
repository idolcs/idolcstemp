import SemesterButton from "../../Home/SelectSemester/SemesterButton/SemesterButton";

const SubjectSelector = () => {

    const subjects = [
        {
            name: "Programming in Python",
            subjectId: "201"
        },
        {
            name: "Programming in C",
            subjectId: "202"
        },
        {
            name: "Computer Organisation and Design",
            subjectId: "203"
        },
        {
            name: "Database Systems",
            subjectId: "204"
        },
        {
            name: "Introduction to Algorithms",
            subjectId: "205"
        }
    ]

    return (
        <>
            <div className="my-8">
                <p className="font-bold">Select Subject</p>
                <div>
                    {subjects.map((sub) => <SemesterButton title={sub.name} target={sub.subjectId} />)}
                </div>
            </div>  
        </>
    )
}

export default SubjectSelector;