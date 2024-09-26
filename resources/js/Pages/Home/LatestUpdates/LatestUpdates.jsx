import { Link } from "@inertiajs/react";
import UpdateLink from "./UpdateLink/UpdateLink";

const LatestUpdates = ({updates}) => {

    console.log(updates)

    return (
        <>
            <div className="my-8">
                <p className="font-bold">Latest Updates</p>
                {updates.map((update) => (
                    <UpdateLink
                        title={update.title}
                        date={update.date}
                        target={`updates/${update.slug}`}
                    />
                ))}
                <div className="pt-2 flex w-full justify-end">
                    <Link
                    href="/updates"
                    >View all</Link>
                </div>
            </div>
        </>
    );
};

export default LatestUpdates;
