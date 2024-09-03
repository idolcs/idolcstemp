import IdolcsLogo from "../../assets/IDOLCS.svg";

const MainWrapper = ({children}) => {
    return(
        <>
            <div className="w-full h-full flex flex-col items-center">
                <div className="w-full max-w-full md:max-w-[768px]">
                <div className="flex items-center justify-center">
                    <div className="p-4">
                        <img className="h-[2em]" src={IdolcsLogo} alt="" />
                    </div>
                </div>
                <div className="p-4 pt-2">
                {children}
                </div>
                </div>
            </div>
        </>
    )
}

export default MainWrapper;