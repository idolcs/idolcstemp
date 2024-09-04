import ResourceItem from "./ResourceItem/ResourceItem";

const ResourcesList = () => {

    const resources = [
        {
            title : "Object Oriented Programming with no brainer concepts",
            type: "youtube",
            date: "20 February 2024"
        },
        {
            title : "Python Programming",
            type: "youtube",
            date: "20 February 2024"
        },
        {
            title : "Python Programming",
            date: "20 February 2024"
        },
    ]

    return (
        <>
            <div className="my-8">
                <p className="font-bold">Resources</p>
                <div className="">
                    {resources.map((res) => <ResourceItem resource={res} />)}
                </div>
            </div>
        </>
    )
}

export default ResourcesList;