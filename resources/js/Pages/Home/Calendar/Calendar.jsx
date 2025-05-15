import { Link } from "@inertiajs/react";
import React from "react";

const Calendar = ({ data }) => {
    console.log(data);

    let events = data.original.events;

    // let events = [
    //     { day: "Wed", date: 1 },
    //     { day: "Thu", date: 2 },
    //     { day: "Fri", date: 3 },
    //     {
    //         day: "Sat",
    //         date: 4,
    //         events: [
    //             {
    //                 semester: 1,
    //                 title: "Practical Exams",
    //                 link: "lmao",
    //             },
    //         ],
    //     },
    //     { day: "Sun", date: 5 },
    //     { day: "Mon", date: 6 },
    //     { day: "Tue", date: 7 },
    //     { day: "Wed", date: 8 },
    //     { day: "Thu", date: 9 },
    //     { day: "Fri", date: 10 },
    //     { day: "Sat", date: 11 },
    //     { day: "Sun", date: 12 },
    //     { day: "Mon", date: 13 },
    //     { day: "Tue", date: 14 },
    //     { day: "Wed", date: 15 },
    //     { day: "Thu", date: 16 },
    //     { day: "Fri", date: 17 },
    //     { day: "Sat", date: 18 },
    //     { day: "Sun", date: 19 },
    //     { day: "Mon", date: 20 },
    //     { day: "Tue", date: 21 },
    //     { day: "Wed", date: 22 },
    //     {
    //         day: "Thu",
    //         date: 23,
    //         events: [
    //             {
    //                 semester: 2,
    //                 title: "Practical Exams",
    //                 description: "This is a test description",
    //                 link: "https://google.com",
    //             },
    //             {
    //                 semester: 1,
    //                 title: "Practical Exams",
    //                 description: "This is a test description",
    //                 link: "https://google.com",
    //             },
    //         ],
    //     },
    //     { day: "Fri", date: 24 },
    //     { day: "Sat", date: 25 },
    //     { day: "Sun", date: 26 },
    //     { day: "Mon", date: 27 },
    //     { day: "Tue", date: 28 },
    //     { day: "Wed", date: 29 },
    //     { day: "Thu", date: 30 },
    //     { day: "Fri", date: 31 },
    // ];

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    let startDay = events[0].day;
    let startIndex = days.indexOf(startDay);
    let blankEvents = [];
    for (let i = 0; i < startIndex; i++) {
        blankEvents.push({ ignore: true, day: days[i], date: "" });
    }
    events = blankEvents.concat(events);

    const [hoveredEvent, setHoveredEvent] = React.useState(null);

    return (
        <>
            <div className="mt-8">
                <p className="font-bold">Calendar</p>
                <p className="text-center mt-[1em] mb-[1em]">
                    {data.original.monthAndYear}
                </p>
                {hoveredEvent && (
                    <div
                        className="fixed flex flex-col  mt-[2em] min-w-[10em] max-w-[10em] rounded-md bg-[#202020] p-[0.5em] opacity-100 z-10"
                        style={{ left: hoveredEvent.x, top: hoveredEvent.y }}
                    >
                        <p className="text-[0.7em]">
                            Semester {hoveredEvent.data.semester}
                        </p>
                        <p className="mt-[0.5em]">{hoveredEvent.data.title}</p>
                        <p className="text-[0.7em]">
                            {hoveredEvent.data.description}
                        </p>
                    </div>
                )}
                <div className={`grid grid-cols-7 gap-[0.5em] md:gap-[1em]`}>
                    {days.map((day, index) => {
                        return (
                            <div
                                key={index}
                                className="flex flex-col items-center"
                            >
                                <div className="w-full items-center justify-center flex">
                                    <p className="font-bold">{day}</p>
                                </div>
                            </div>
                        );
                    })}
                    {events.map((event, index) => {
                        if (event.ignore) {
                            return (
                                <div
                                    key={index}
                                    className="flex flex-col items-center"
                                >
                                    <div className="w-full items-center justify-center flex"></div>
                                </div>
                            );
                        }

                        const noEvents =
                            !event.events || event.events.length === 0;

                        return (
                            <div
                                key={index}
                                className={`flex flex-col items-center ${
                                    noEvents ? "opacity-40" : ""
                                }`}
                            >
                                <div
                                    className={`w-full min-h-[4em] flex flex-col border rounded-lg border-[#525252] p-[0.3em] md:p-[0.7em]`}
                                >
                                    <p className="text-[0.8em] mb-[0.2em]">
                                        {event.date}
                                    </p>
                                    {event.events &&
                                        event.events.map((event, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className={`w-full bg-[#292929] hover:bg-[#686868] rounded p-[0.2em] text-center mt-[0.2em] cursor-pointer`}
                                                    onMouseEnter={(e) => {
                                                        setHoveredEvent({
                                                            x: e.clientX + 10,
                                                            y: e.clientY + 10,
                                                            data: event,
                                                        });
                                                    }}
                                                    onClick={() => {
                                                        alert(event.link);
                                                    }}
                                                    onMouseLeave={() =>
                                                        setHoveredEvent(null)
                                                    }
                                                >
                                                    <p className="text-[0.8em]">
                                                        {window.innerWidth < 600
                                                            ? event.semester
                                                            : `Sem ${event.semester}`}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-center mt-[2em] w-[100%] gap-[4em]">
                    <Link
                        className="opacity-60 hover:opacity-100"
                        href={`/?monthAndYear=${data.original.previousMonthAndYear}`}
                    >
                        Previous month
                    </Link>
                    <Link
                        className="opacity-60 hover:opacity-100"
                        href={`/?monthAndYear=${data.original.nextMonthAndYear}`}
                    >
                        Next month
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Calendar;
