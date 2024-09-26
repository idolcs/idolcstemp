import ResourceItem from "./ResourceItem/ResourceItem";

const ResourcesList = ({links}) => {

    return (
        <>
            <div className="my-8">
                <p className="font-bold">Resources</p>
                <div className="">
                    {links.map((res) => <ResourceItem resource={res} />)}
                </div>
            </div>
        </>
    )
}

export default ResourcesList;