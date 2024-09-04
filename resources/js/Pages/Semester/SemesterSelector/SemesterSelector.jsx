import downArrow from "../../../../../public/assets/downArrow.svg";
import React, { useRef, useState } from "react";
import SemesterButton from "../../Home/SelectSemester/SemesterButton/SemesterButton";
import ChangeSemester from "./ChangeSemester/ChangeSemester";

const SemesterSelector = ({ semNumber }) => {

    const [semSelectorVisible, setSemSelectorVisible] = useState(false);

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

    const changeSemester = (e) => {
        setSemSelectorVisible(true);
    };

    const closeSemSelector = (e) => {
        setSemSelectorVisible(false);
    }

    return (
        <>
            <div
                onClick={changeSemester}
                className="flex items-center cursor-pointer"
            >
                <p className="inline font-bold text-[1.5em] mr-2">
                    Semester {semNumber}
                </p>
                <img className="inline h-[1em] mr-4" src={downArrow} alt="" />
            </div>
            <ChangeSemester closeSemSelector={closeSemSelector} semSelectorVisible={semSelectorVisible} semesters={semesters} />
            
        </>
    );
};

export default SemesterSelector;
