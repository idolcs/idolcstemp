import downArrow from "../../../../../public/assets/downArrow.svg";
import ChangeSubject from "../ChangeSubject/ChangeSubject";
import React, { useRef, useState } from "react";

const SubjectSelector = ({name, subjects}) => {

    const [subSelectorVisible, setSubSelectorVisible] = useState(false);

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
