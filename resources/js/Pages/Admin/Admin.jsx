import { useEffect, useState } from "react";
import MainWrapper from "../../Layout/MainWrapper";
import ManageMembers from "./ManageMembers/ManageMembers";
import ManageSemesters from "./ManageSemesters/ManageSemesters";
import ManageSubjects from "./ManageSubjects/ManageSubjects";

const Admin = () => {
    const [isAuthorised, setIsAuthorised] = useState(false);
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);

    useEffect(() => {
        axios
            .post("/api/v1/user/is-superadmin", {
                token: localStorage.getItem("remember_token"),
            })
            .then((res) => {
                console.log(res.data);
                if (res.data["is_admin"]) {
                    setIsSuperAdmin(true);
                } else {
                    setIsSuperAdmin(false);
                }
            });
    }, []);

    useEffect(() => {
        axios
            .post("/api/v1/user/is-admin", {
                token: localStorage.getItem("remember_token"),
            })
            .then((res) => {
                if (!(res.data["is_admin"] == true)) {
                    setIsAuthorised(false);
                } else {
                    setIsAuthorised(true);
                }
            });
    }, []);

    if (!isAuthorised) {
        return (
            <>
                <p>You are unauthorised to view this page</p>
            </>
        );
    }

    return (
        <>
            <div>
                <p className="text-[1.5em] font-bold">Admin Dashboard</p>
                <ManageMembers isSuperAdmin={isSuperAdmin} setIsSuperAdmin={setIsSuperAdmin} />
                <ManageSemesters isSuperAdmin={isSuperAdmin} />
                <ManageSubjects isSuperAdmin={isSuperAdmin} />
            </div>
        </>
    );
};

Admin.layout = (page) => <MainWrapper children={page} />;
export default Admin;
