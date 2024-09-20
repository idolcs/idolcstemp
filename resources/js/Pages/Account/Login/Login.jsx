import MainWrapper from "../../../Layout/MainWrapper";
import GoogleLogo from "../../../../../public/assets/google-178-svgrepo-com.svg";
import { Link } from "@inertiajs/react";

const Login = () => {
    return (
        <>
            <div className="w-full mt-[10em] flex flex-col items-center justify-center">
                <a href="/auth/google/redirect" className="flex items-center gap-2 border rounded-full py-2 px-4">
                    <img className="h-[1.5em]" src={GoogleLogo} alt="" />
                    <p className="text-[1.5em]">Sign in with Google</p>
                </a>
            </div>
        </>
    );
};

Login.layout = (page) => <MainWrapper children={page} />;
export default Login;
