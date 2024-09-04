import MainWrapper from "../../../../Layout/MainWrapper";
import SemesterButton from "../../../Home/SelectSemester/SemesterButton/SemesterButton";

const ChangeSemester = ({
    closeSemSelector,
    semSelectorVisible,
    semesters,
}) => {
    return (
        <>
            <div
                onClick={closeSemSelector}
                className={`${
                    semSelectorVisible ? "absolute" : "hidden"
                } w-full h-full top-0 left-0 bg-[#141414] p-4 flex justify-center z-[100]`}
            >
                <div className="w-full max-w-full md:max-w-[768px]">
                    <p className="font-bold text-[1.5em]">Change Semester</p>
                    <div>
                        {semesters.map((sem) => (
                            <SemesterButton
                                title={sem.title}
                                target={sem.target}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChangeSemester;
