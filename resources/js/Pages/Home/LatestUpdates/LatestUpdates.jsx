import UpdateLink from "./UpdateLink/UpdateLink";

const LatestUpdates = () => {

    const updates = [
        {
            title: "Results announced for Semester 2, Tap here to read more",
            date: "12th February 2024",
            target: "results-ann"
        },
        {
            title: "We closed an advertisement deal",
            date: "12th February 2024",
            target: "ads-lala"
        },
        {
            title: "Results announced for Semester 2, Tap here to read more",
            date: "12th February 2024",
            target: "results-ann"
        },
    ]

    return (
        <>
            <div className="my-8">
                <p className="font-bold">Latest Updates</p>
                {updates.map((update) => <UpdateLink title={update.title} date={update.date} target={update.target} />)}
            </div>
        </>
    );
};

export default LatestUpdates;
