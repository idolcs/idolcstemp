import { Link } from "@inertiajs/react";
import React from "react";
import { useEffect, useRef, useState } from "react";

const Calendar = ({ data }) => {
    // Add a ref for the calendar element
    const calendarRef = useRef(null);
    const [calendarY, setCalendarY] = useState(0);

    // Get the Y position when component mounts
    useEffect(() => {
        if (calendarRef.current) {
            const rect = calendarRef.current.getBoundingClientRect();
            setCalendarY(window.pageYOffset + rect.top);
        }
    }, []);

    let events = data.original.events;

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
            <div className="mt-8" ref={calendarRef}>
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

                        const isToday = new Date(`${event.date} ${data.original.monthAndYear}`).toLocaleDateString() === new Date().toLocaleDateString();


                        return (
                            <div
                                key={index}
                                className={`flex flex-col items-center ${
                                    noEvents ? "opacity-40" : ""
                                }`}
                            >
                                <div
                                    className={`w-full min-h-[4em] flex flex-col border rounded-lg ${isToday ? "border-[#cacaca] border-2" : "border-[#525252]"} p-[0.3em] md:p-[0.7em]`}
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
                                                        if (event.link) {
                                                            window.open(
                                                                event.link,
                                                                "_blank"
                                                            );
                                                        }
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
                        href={`/?monthAndYear=${data.original.previousMonthAndYear}&scrollTo=${calendarY}`}
                    >
                        {" < Prev"}
                    </Link>
                    <Link
                        className="opacity-60 hover:opacity-100"
                        href={`/?monthAndYear=${data.original.nextMonthAndYear}&scrollTo=${calendarY}`}
                    >
                        {"Next >"}
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Calendar;
