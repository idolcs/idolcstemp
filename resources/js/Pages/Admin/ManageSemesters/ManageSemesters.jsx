import { useEffect, useState } from "react";

const ManageSemesters = ({ isSuperAdmin }) => {
    if (!isSuperAdmin) {
        return null;
    }

    const [semesterData, setSemesterData] = useState("");
    const [semesterRows, setSemesterRows] = useState([]);

    useEffect(() => {
        axios
            .post(
                "/api/v1/superadmin/semesterstats",
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
                setSemesterData(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    let newSemesterRows = [];

    useEffect(() => {
        Object.keys(semesterData).forEach((key, index) => {
            console.log(key);
            newSemesterRows.push(
                <tr>
                    <td>{key ? key : "No Semester"}</td>
                    <td>{semesterData[key].length}</td>
                </tr>
            );
        });
        setSemesterRows(newSemesterRows);
    }, [semesterData]);

    return (
        <>
            <div className="p-4 border border-[#858585]">
                <p>Semesters Statistics</p>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Semester</th>
                            <th>Members</th>
                        </tr>
                    </thead>
                    <tbody>{semesterRows}</tbody>
                </table>
            </div>
        </>
    );
};

export default ManageSemesters;
