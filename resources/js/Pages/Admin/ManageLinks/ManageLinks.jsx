import axios from "axios";
import { useEffect, useState } from "react";
import ToggleButon from "../ToggleButton/ToggleButton";
import deleteIcon from "../../../../../public/assets/red-delete-svgrepo-com.svg";

const ManageLinks = ({isAdmin, isSuperAdmin}) => {

    if(!isAdmin && !isSuperAdmin){
        return null;
    }

    const [subject, setSubject] = useState("");
    const [subjects, setSubjects] = useState([]);
    const [semester, setSemester] = useState("");
    const [isYoutube, setIsYoutube] = useState(false);
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [links, setLinks] = useState([]);
    const [refreshLinks, setRefreshLinks] = useState(0);

    const toggleIsYoutube = () => {
        setIsYoutube(!isYoutube);
    };

    const loadSubjects = (e) => {
        const semester = e.target.value;
        setSemester(semester);

        axios
            .get(`/api/v1/admin/getsubjectsbysemester?semester=${semester}`, {
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
                console.error(err);
            });
    };

    const postLink = () => {
        axios
            .post(
                "/api/v1/admin/link/new",
                {
                    semester: semester,
                    subject: subject,
                    title: title,
                    url: url,
                    isYoutube: isYoutube,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "remember_token"
                        )}`,
                    },
                }
            )
            .then((res) => {
                alert("Link Created");
                setRefreshLinks(refreshLinks + 1);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    useEffect(() => {
        axios
            .get("/api/v1/admin/link/get", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "remember_token"
                    )}`,
                },
            })
            .then((res) => {
                setLinks(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [refreshLinks]);

    const deleteNote = (noteId) => {
        axios.post(
            "/api/v1/admin/link/delete",
            {
                id: noteId,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "remember_token"
                    )}`,
                },
            }
        ).then((res) => {
            alert("Note deleted");
            setRefreshLinks(refreshLinks + 1);
        }).catch((err) => {
            console.error(err);
        });
    };

    return (
        <>
            <div className="my-8 p-4 border border-[#757575] rounded">
                <p>Manage Links</p>
                <div className="p-4 border my-3  border-[#757575] rounded">
                    <p>Create new link</p>
                    <div className="p-2">
                        <select
                            onChange={loadSubjects}
                            className="bg-gray-800 p-2 w-full"
                            name=""
                            id=""
                        >
                            <option selected disabled>
                                -- Select Semester --
                            </option>
                            <option value="1">Semester 1</option>
                            <option value="2">Semester 2</option>
                            <option value="3">Semester 3</option>
                            <option value="4">Semester 4</option>
                            <option value="5">Semester 5</option>
                            <option value="6">Semester 6</option>
                        </select>
                    </div>
                    <div className="p-2">
                        <select
                            onChange={(e) => {
                                setSubject(e.target.value);
                            }}
                            className="bg-gray-800 p-2 w-full "
                            name=""
                            id=""
                        >
                            <option selected disabled value="">
                                -- Select Subject --
                            </option>
                            {subjects.map((subject) => {
                                return (
                                    <>
                                        <option value={subject.code}>
                                            {subject.name}
                                        </option>
                                    </>
                                );
                            })}
                        </select>
                    </div>
                    <div className="p-2">
                        <p>Is Youtube?</p>
                        <div className="p-1">
                            <ToggleButon
                                initState={isYoutube}
                                callback={toggleIsYoutube}
                            />
                        </div>
                    </div>
                    <div className="p-2">
                        <input
                            type="text"
                            className="bg-gray-800 p-2 w-full"
                            placeholder="Title"
                            value={title}
                            onInput={(e) => {
                                setTitle(e.target.value);
                            }}
                        />
                    </div>
                    <div className="p-2">
                        <input
                            type="text"
                            className="bg-gray-800 p-2 w-full"
                            placeholder="URL"
                            value={url}
                            onInput={(e) => {
                                setUrl(e.target.value);
                            }}
                        />
                    </div>
                    <div className="p-2">
                        <button onClick={postLink} className="p-4 bg-green-900">
                            Submit
                        </button>
                    </div>
                </div>
                {
                    isSuperAdmin ? 
                    (<div className="p-2">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Sem</th>
                                    <th>Subject</th>
                                    <th>Title</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {links.map((link) => {
                                    return (
                                        <tr>
                                            <td>{link.semester}</td>
                                            <td>{link.subject}</td>
                                            <td>{link.title}</td>
                                            <td>
                                                <img
                                                    onClick={() => {
                                                        deleteNote(link.id);
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
                    </div>) : null
                }
            </div>
        </>
    );
};

export default ManageLinks;
