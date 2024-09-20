import downArrow from "../../../../../public/assets/downArrow.svg";
import React, { useRef, useState } from "react";
import SemesterButton from "../../Home/SelectSemester/SemesterButton/SemesterButton";
import ChangeSemester from "./ChangeSemester/ChangeSemester";

const SemesterSelector = ({ semNumber, activeSemesters }) => {

    const [semSelectorVisible, setSemSelectorVisible] = useState(false);

    let semesters = [];

    for(let i = 0; i < activeSemesters; i++){
        semesters.push({
            title: `Semester ${i + 1}`,
            target: `/${i + 1}`
        })
    }

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