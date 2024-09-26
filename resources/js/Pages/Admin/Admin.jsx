import { useEffect, useState } from "react";
import MainWrapper from "../../Layout/MainWrapper";
import ManageMembers from "./ManageMembers/ManageMembers";
import ManageSemesters from "./ManageSemesters/ManageSemesters";
import ManageSubjects from "./ManageSubjects/ManageSubjects";
import ManageUpdates from "./ManageUpdates/ManageUpdates";
import ManageNotes from "./ManageNotes/ManageNotes";
import ManageLinks from "./ManageLinks/ManageLinks";
import ManageRedirects from "./ManageRedirects/ManageRedirects";

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
                <p className="text-[1.5em] font-bold mb-8">Admin Dashboard</p>
                <ManageRedirects isSuperAdmin={isSuperAdmin} isAdmin={isAuthorised} />
                <ManageMembers isSuperAdmin={isSuperAdmin} setIsSuperAdmin={setIsSuperAdmin} />
                <ManageSemesters isSuperAdmin={isSuperAdmin} />
                <ManageSubjects isSuperAdmin={isSuperAdmin} />
                <ManageUpdates isSuperAdmin={isSuperAdmin} isAdmin={isAuthorised} />
                <ManageNotes  isSuperAdmin={isSuperAdmin} isAdmin={isAuthorised} />
                <ManageLinks isSuperAdmin={isSuperAdmin} isAdmin={isAuthorised}/>
            </div>
        </>
    );
};

Admin.layout = (page) => <MainWrapper children={page} />;
export default Admin;
