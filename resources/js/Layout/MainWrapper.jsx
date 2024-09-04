import { Link } from "@inertiajs/react";
import IdolcsLogo from "../../../public/assets/IDOLCS.svg";

const MainWrapper = ({children}) => {
    return(
        <>
            <div className="w-full h-full flex flex-col items-center">
                <div className="w-full max-w-full md:max-w-[768px]">
                <div className="flex items-center justify-center">
                    <Link href="/" className="p-4">
                        <img className="h-[2em]" src={IdolcsLogo} alt="" />
                    </Link>
                </div>
                <div className="p-4 pt-2 relative">
                {children}
                </div>
                </div>
            </div>
        </>
    )
}

export default MainWrapper;