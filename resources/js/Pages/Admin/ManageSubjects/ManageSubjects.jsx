import axios from "axios";
import { useEffect, useState } from "react";
import editIcon from "../../../../../public/assets/pencil-svgrepo-com.svg";
import deleteIcon from "../../../../../public/assets/red-delete-svgrepo-com.svg";

const ManageSubjects = ({ isSuperAdmin }) => {
    if (!isSuperAdmin) {
        return null;
    }

    const [semester, setSemester] = useState(1);

    const changeSemester = (e) => {
        e.preventDefault();
        setSemester(e.target.value);
    };

    const [formCode, setFormCode] = useState();
    const [formName, setFormName] = useState();
    const [refresSubjects, setRefreshSubjects] = useState(0);

    const semesterSubmit = () => {
        const formData = {
            semester: semester,
            code: formCode,
            name: formName,
        };

        axios
            .post("/api/v1/superadmin/subject/add", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "remember_token"
                    )}`,
                },
            })
            .then((res) => {
                setFormCode("");
                setFormName("");
                setRefreshSubjects(refresSubjects + 1);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        axios
            .get(`/api/v1/superadmin/subject/get?semester=${semester}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "remember_token"
                    )}`,
                },
            })
            .then((res) => {
                setSubjects(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [semester, refresSubjects]);

    const deleteSubject = (code) => {
        axios.post(
            "/api/v1/superadmin/subject/delete",
            {
                code: code,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "remember_token"
                    )}`,
                },
            }
        ).then((res) => {
            setRefreshSubjects(refresSubjects + 1);
        }).catch((err) => {
            console.error(err);
        });
    };

    return (
        <>
            <div className="my-8 p-4 border border-[#757575] rounded">
                <p>Manage Subjects</p>
                <div>
                    <div>
                        <select
                            onChange={changeSemester}
                            className="bg-black px-2 py-1 my-2"
                            name=""
                            id=""
                        >
                            <option selected value="1">
                                Sem 1
                            </option>
                            <option value="2">Sem 2</option>
                            <option value="3">Sem 3</option>
                            <option value="4">Sem 4</option>
                            <option value="5">Sem 5</option>
                            <option value="6">Sem 6</option>
                        </select>
                    </div>
                    <div>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Name</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subjects.map((subject) => {
                                    return (
                                        <tr>
                                            <td>{subject.code}</td>
                                            <td>{subject.name}</td>
                                            <td>
                                                <img
                                                    onClick={() => {
                                                        setFormCode(
                                                            subject.code
                                                        );
                                                        setFormName(
                                                            subject.name
                                                        );
                                                    }}
                                                    className="h-[1em] opacity-60 hover:opacity-100 cursor-pointer"
                                                    src={editIcon}
                                                    alt=""
                                                />
                                            </td>
                                            <td>
                                                <img
                                                    onClick={() => {
                                                        deleteSubject(
                                                            subject.code
                                                        );
                                                    }}
                                                    className="h-[1em] opacity-60 hover:opacity-100 cursor-pointer"
                                                    src={deleteIcon}
                                                    alt=""
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 p-4 bg-[#1d1d1d]">
                        <p>Add or Update Subject in Semester {semester} </p>
                        <div className="py-2 flex flex-col">
                            <input
                                className="rounded m-1 p-2 bg-[#111]"
                                type="number"
                                placeholder="Code"
                                value={formCode}
                                onChange={(e) => {
                                    setFormCode(e.target.value);
                                }}
                            />
                            <input
                                className="rounded m-1 p-2 bg-[#111]"
                                type="text"
                                placeholder="Subject Name"
                                value={formName}
                                onChange={(e) => {
                                    setFormName(e.target.value);
                                }}
                            />
                            <button
                                className="rounded m-1 p-2 bg-[#111] hover:bg-[#006100]"
                                onClick={semesterSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ManageSubjects;
