import SemesterButton from "./SemesterButton/SemesterButton";

const SelectSemester = () => {

    const semesters = [
        {
            title: "Semester 1",
            target: "/1"
        },
        {
            title: "Semester 2",
            target: "/2"
        },
        {
            title: "Semester 3",
            target: "/3"
        }
    ]

    return(
        <>
            <div className="my-8">
                <p className="font-bold">Select Your Semester</p>
                {semesters.map((sem) => <SemesterButton title={sem.title} target={sem.target} />)}
            </div>
        </>
    )
}

export default SelectSemester;