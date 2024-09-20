import UpdateLink from "../../Home/LatestUpdates/UpdateLink/UpdateLink";

const SemUpdates = ({semNumber}) => {

    const updates = [
        {
            title: "Hello World",
            date: "23 July 2024",
            target: "http://localhost:8001/2"
        },
        {
            title: "All Journals for year 2024-25",
            date: "23 July 2024",
            target: ""
        }
    ]

    return (
        <>
             <div className="my-8">
                <p className="font-bold">Updates for Semester {semNumber}</p>
                <div>
                    {updates.map((update) => (<UpdateLink title={update.title} date={update.date} target={update.target} />))}
                </div>
            </div>  
        </>
    )
}

export default SemUpdates;