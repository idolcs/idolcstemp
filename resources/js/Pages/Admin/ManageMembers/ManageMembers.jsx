import { useEffect, useState } from "react";
import "../../../../css/admin.css";
import ToggleButon from "../ToggleButton/ToggleButton";

const ManageMembers = ({ isSuperAdmin }) => {
    if (!isSuperAdmin) {
        return <>{null}</>;
    }

    const [members, setMembers] = useState([]);

    useEffect(() => {
        if (isSuperAdmin) {
            axios
                .post(
                    "/api/v1/superadmin/getallmembers",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "remember_token"
                            )}`,
                        },
                    }
                )
                .then((res) => {
                    setMembers(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [isSuperAdmin]);

    const toggleSuperAdmin = async (email, state) => {
        const toggleStatus = await axios.post(
            "/api/v1/superadmin/togglesuperadmin",
            {
                targetEmail: email,
                targetState: state,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "remember_token"
                    )}`,
                },
            }
        );
        if (!toggleStatus) {
            return false;
        }

        return true;
    };

    const toggleAdmin = async (email, state) => {
        const toggleStatus = await axios.post("/api/v1/superadmin/toggleadmin", {
            targetEmail: email,
            targetState: state,
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(
                    "remember_token"
                )}`,
            },
        });
        if (!toggleStatus) {
            return false;
        }

        return true;
    };

    return (
        <>
            <div className="my-8 p-4 border border-[#757575] rounded">
                <p>List of all Members</p>
                <div className="p-2 overflow-x-scroll overflow-y-scroll h-[20em]">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Semester</th>
                                <th>Email</th>
                                <th>SuperAdmin</th>
                                <th>Admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.length > 0
                                ? members.map((mem) => {
                                      return (
                                          <tr>
                                              <td>{mem.name}</td>
                                              <td>{mem.semester}</td>
                                              <td>{mem.email}</td>
                                              <td>
                                                  <ToggleButon
                                                      initState={mem.superadmin}
                                                      callback={
                                                          toggleSuperAdmin
                                                      }
                                                      email={mem.email}
                                                  />
                                              </td>
                                              <td>
                                                  <ToggleButon
                                                      initState={mem.admin}
                                                      callback={toggleAdmin}
                                                      email={mem.email}
                                                  />
                                              </td>
                                          </tr>
                                      );
                                  })
                                : null}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ManageMembers;
