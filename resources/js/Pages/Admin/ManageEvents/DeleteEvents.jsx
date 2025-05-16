import axios from "axios";
import React, { useEffect, useState } from "react";

const DeleteEvents = () => {
    const deleteEvent = async (id) => {
        if (id === "") {
            alert("Please enter an event ID");
            return;
        }

        try {
            axios
                .post(
                    "/api/v1/admin/events/delete",
                    {
                        id: id,
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
                    alert("Event deleted successfully");
                    setAllEvents((prevEvents) =>
                        prevEvents.filter((event) => event.id !== id)
                    );
                })
                .catch((err) => {
                    console.log(err);
                    alert("Error deleting event");
                });
        } catch (error) {
            console.error("Error deleting event:", error);
            alert("Error deleting event");
        }
    };

    const [allEvents, setAllEvents] = useState([]);

    useEffect(() => {
        axios
            .get("/api/v1/admin/events/getAll", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "remember_token"
                    )}`,
                },
            })
            .then((res) => {
                const events = res.data.events.sort((a, b) => {
                    return new Date(b.event_date) - new Date(a.event_date);
                }
                );
                setAllEvents(events);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    console.log(allEvents);

    return (
        <div className="border border-[#858585] p-2 mt-2">
            <p>Delete Events</p>
            <table className="w-full border">
                <thead>
                    <tr className="flex justify-between items-center border-b border-[#4b4b4b] p-2">
                        <th className="w-[40%]">Title</th>
                        <th className="w-[20%]">Semester</th>
                        <th className="w-[20%]">Event Date</th>
                        <th className="w-[20%]">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allEvents.map((event) => {
                        return (
                            <tr
                                key={event.id}
                                className="flex justify-between items-center text-center border-b border-[#4b4b4b] p-2"
                            >
                                <td className="w-[40%]">{event.title}</td>
                                <td className="w-[20%]">{event.semester}</td>
                                <td className="w-[20%]">{event.event_date}</td>
                                <td className="w-[20%]">
                                    <button
                                        onClick={() => {
                                            deleteEvent(event.id);
                                        }}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default DeleteEvents;
