import NoteItem from "./NoteItem/NoteItem";

const NotesList = ({notes}) => {
    // const notes = [
    //     {
    //         title: "Full Subject PDF",
    //         description:
    //             "This PDF covers the complete syllabus of Python Programming, this PDF is sourced from E-next",
    //         date: "12th Febraury 2024",
    //     },
    //     {
    //         title: "Object Oriented Programming",
    //         description: "OOPs concepts covered",
    //         date: "22 January 2024",
    //     },
    //     {
    //         title: "Introduction to Algorithms",
    //         date: "3 March 2024",
    //     },
    // ];

    return (
        <>
            <div className="my-8">
                <p className="font-bold">Notes</p>
                {notes.map((note) => (
                    <NoteItem
                        note={note}
                    />
                ))}
            </div>
        </>
    );
};

export default NotesList;
