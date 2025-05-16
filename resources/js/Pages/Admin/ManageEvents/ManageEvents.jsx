import { useState } from "react";
import DeleteEvents from "./DeleteEvents";

const ManageEvents = () => {
    const [semester, setSemester] = useState(1);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const selectSemester = (e) => {
        setSemester(e.target.value);
    };

    const postEvent = () => {
        if (title === "" || description === "" || link === "") {
            alert("Please fill all the fields");
            return;
        }
        axios
            .post(
                "/api/v1/admin/events/new",
                {
                    semester: semester,
                    title: title,
                    description: description,
                    link: link,
                    start_date: startDate,
                    end_date: endDate,
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
                console.log(res.data);
                alert("Event created successfully");
                setTitle("");
                setDescription("");
                setLink("");
                setStartDate("");
                setEndDate("");
                setSemester(1);
            })
            .catch((err) => {
                console.log(err);
                alert("Error creating event");
            });
    };

    return (
        <>
            <div className="my-8 p-4 border border-[#858585]">
                <p>Manage Events</p>
                <div className="border border-[#858585] p-2 mt-2">
                    Create Event
                    <div className="p-2">
                        <select
                            onChange={selectSemester}
                            className="bg-gray-800 p-2 w-full"
                            name=""
                            id=""
                            value={semester}
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
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onInput={(e) => {
                                setTitle(e.target.value);
                            }}
                            className="bg-gray-800 p-2 w-full "
                        />
                    </div>
                    <div className="p-2">
                        <input
                            type="text"
                            placeholder="Description"
                            value={description}
                            onInput={(e) => {
                                setDescription(e.target.value);
                            }}
                            className="bg-gray-800 p-2 w-full "
                        />
                    </div>
                    <div className="p-2">
                        <input
                            type="text"
                            placeholder="Link"
                            value={link}
                            onInput={(e) => {
                                setLink(e.target.value);
                            }}
                            className="bg-gray-800 p-2 w-full "
                        />
                    </div>
                    <div className="p-2">
                        <input
                            type="date"
                            placeholder="Start Date"
                            value={startDate}
                            onInput={(e) => {
                                setStartDate(e.target.value);
                            }}
                            className="bg-gray-800 p-2 w-full "
                        />
                    </div>
                    <div className="p-2">
                        <input
                            type="date"
                            placeholder="End Date"
                            value={endDate}
                            onInput={(e) => {
                                setEndDate(e.target.value);
                            }}
                            className="bg-gray-800 p-2 w-full "
                        />
                    </div>
                    <div className="p-2">
                        <button
                            className="p-4 bg-green-900"
                            onClick={postEvent}
                        >
                            Submit
                        </button>
                    </div>
                </div>
                <DeleteEvents />
            </div>
        </>
    );
};

export default ManageEvents;
