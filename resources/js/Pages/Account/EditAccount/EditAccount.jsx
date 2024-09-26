import { Link } from "@inertiajs/react";

const EditAccount = () => {

    const Logout = () => {
        localStorage.removeItem('remember_token');
        window.location.href = "/";
    }

    return (
        <>
            <div className="flex gap-1 mt-4 text-[0.8em]">
                {/* <Link className=" hover:bg-white hover:text-black hover:font-semibold rounded bg-[#414141] py-1 px-2" href="/account/edit">Edit Account</Link> */}
                <button onClick={Logout} className=" hover:bg-red-600 hover:text-white text-red-300 hover:font-semibold rounded bg-[#414141] py-1 px-2" href="/account/edit">Logout</button>
            </div>
        </>
    )
}

export default EditAccount;