import downArrow from "../../../../../public/assets/downArrow.svg";
import ChangeSubject from "../ChangeSubject/ChangeSubject";
import React, { useRef, useState } from "react";

const SubjectSelector = ({name}) => {

    const [subSelectorVisible, setSubSelectorVisible] = useState(false);

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

    const changeSubject = (e) => {
        setSubSelectorVisible(true);
    };

    const closeSubSelector = (e) => {
        setSubSelectorVisible(false);
    }


    return (
        <>
            <div onClick={changeSubject} className="flex items-center cursor-pointer">
                <p className="inline font-bold text-[1.5em] mr-2">
                    {name}
                </p>
                <img className="inline h-[1em] mr-4" src={downArrow} alt="" />
            </div>
            <ChangeSubject closeSubSelector={closeSubSelector} subSelectorVisible={subSelectorVisible} subjects={subjects} />
        </>
    );
};

export default SubjectSelector;
