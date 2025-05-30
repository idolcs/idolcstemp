import axios from "axios";
import { useEffect, useRef, useState } from "react";
import deleteIcon from "../../../../../public/assets/red-delete-svgrepo-com.svg";

const ManageNotes = ({ isAdmin, isSuperAdmin }) => {
    if (!isAdmin && !isSuperAdmin) {
        return null;
    }

    const subjectSelectRef = useRef();

    const [semester, setSemester] = useState(1);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [subjects, setSubjects] = useState([[], [], [], [], [], []]);
    const [file, setFile] = useState();
    const [notes, setNotes] = useState([]);
    const [noteRefresh, setNoteRefresh] = useState(0);

    const deleteNote = (noteId) => {
        axios
            .post(
                "/api/v1/admin/note/delete",
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
            )
            .then((res) => {
                setNoteRefresh(noteRefresh + 1);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    useEffect(() => {
        axios
            .get("/api/v1/admin/note/get", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "remember_token"
                    )}`,
                },
            })
            .then((res) => {
                setNotes(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [noteRefresh]);

    useEffect(() => {
        axios
            .get(`/api/v1/admin/getsubjects`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "remember_token"
                    )}`,
                },
            })
            .then((res) => {
                let newSubjects = [[], [], [], [], [], []];
                res.data.map((sub) => {
                    newSubjects[sub.semester - 1].push(sub)
                })
                setSubjects(newSubjects);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const loadSubjects = (e) => {
        const semester = e.target.value;
        setSemester(semester);
    };

    const handleFile = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const postNote = () => {
        let formData = new FormData();
        formData.append("file", file);
        formData.append("subject", subjectSelectRef.current.value);
        formData.append("semester", semester);
        formData.append("title", title);
        formData.append("description", description);

        axios
            .post("/api/v1/admin/note/new", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "remember_token"
                    )}`,
                },
            })
            .then((res) => {
                alert("Uploaded");
                setNoteRefresh(noteRefresh + 1);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <>
            <div className="my-8 p-4 border border-[#757575] rounded">
                <p>Manage Notes</p>

                <div className="p-4 border my-3  border-[#757575] rounded">
                    <p>Create new note</p>
                    <div className="p-2">
                        <select
                            onChange={loadSubjects}
                            className="bg-gray-800 p-2 w-full"
                            name=""
                            id=""
                        >
                            <option defaultChecked disabled>
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
                            ref={subjectSelectRef}
                            className="bg-gray-800 p-2 w-full "
                            name=""
                            id=""
                        >
                            <option defaultChecked disabled value="">
                                -- Select Subject --
                            </option>
                            {subjects[parseInt(semester) - 1].map((subject) => {
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
                        <input
                            type="text"
                            className="bg-gray-800 p-2 w-full"
                            value={title}
                            onInput={(e) => {
                                setTitle(e.target.value);
                            }}
                            placeholder="Title"
                        />
                    </div>
                    <div className="p-2">
                        <textarea
                            value={description}
                            onInput={(e) => {
                                setDescription(e.target.value);
                            }}
                            name=""
                            id=""
                            placeholder="Description here"
                            className="bg-gray-800 p-2 w-full"
                        ></textarea>
                    </div>
                    <div className="p-2">
                        <input
                            className="bg-gray-800 p-2"
                            accept="application/pdf"
                            onChange={handleFile}
                            type="file"
                            name=""
                            id=""
                        />
                    </div>
                    <div className="p-2">
                        <button className="p-4 bg-green-900" onClick={postNote}>
                            Submit
                        </button>
                    </div>
                </div>
                <div className="p-2">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Sem</th>
                                <th>Subject Code</th>
                                <th>Subject Name</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notes.map((note) => {
                                const subjectObj = subjects[
                                    note.semester - 1
                                ].find((o) => o.code === note.subject);
                                return (
                                    <tr>
                                        <td>{note.semester}</td>
                                        <td>{note.subject}</td>
                                        <td>
                                            {subjectObj
                                                ? subjectObj.name
                                                : null}
                                        </td>
                                        <td>{note.title}</td>
                                        <td>{note.author_name}</td>
                                        <td>
                                            <img
                                                onClick={(e) => {
                                                    deleteNote(note.id);
                                                }}
                                                className="opacity-60 hover:opacity-100 h-[1em] cursor-pointer"
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
            </div>
        </>
    );
};

export default ManageNotes;
