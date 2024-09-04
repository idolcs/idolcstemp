import SemesterButton from "../../Home/SelectSemester/SemesterButton/SemesterButton";

const ChangeSubject = ({
    closeSubSelector,
    subSelectorVisible,
    subjects,
}) => {

    return (
        <>
            <div
                onClick={closeSubSelector}
                className={`${
                    subSelectorVisible ? "absolute" : "hidden"
                } w-full min-h-full top-0 left-0 bg-[#141414] p-4 flex justify-center z-[100]`}
            >
                <div className="w-full max-w-full md:max-w-[768px]">
                    <p className="font-bold text-[1.5em]">Change Subject</p>
                    <div>
                        {subjects.map((sem) => (
                            <SemesterButton
                                title={sem.name}
                                target={sem.subjectId}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChangeSubject;
