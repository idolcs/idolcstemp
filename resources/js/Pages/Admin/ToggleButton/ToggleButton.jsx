import { useEffect, useState } from "react";

const ToggleButon = ({initState, callback, email}) => {

    const [isActive, setIsActive] = useState(initState);

    const handleClick = async () => {
        const callbackResponse = await callback(email, !isActive);
        if(callbackResponse){
            console.log(callbackResponse);
        }
        setIsActive(!isActive);
    }


    return (
        <>
            <div onClick={
                handleClick
            } className="cursor-pointer h-[1.5em] w-[3em] bg-[#252525] rounded-full">
                <div className={`${isActive ? "bg-green-400 ml-[1.5em]" : "bg-red-400 ml-0"} transition duration-200 ease h-[1.5em] w-[1.5em] rounded-full `}></div>
            </div>
        </>
    )
}

export default ToggleButon;