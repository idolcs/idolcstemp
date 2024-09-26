import { Link } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import editButton from "../../../../../public/assets/pencil-svgrepo-com.svg";
import deleteButton from "../../../../../public/assets/red-delete-svgrepo-com.svg";
import ToggleButon from "../ToggleButton/ToggleButton";

const ManageUpdates = ({ isSuperAdmin, isAdmin }) => {
    if (!isSuperAdmin && !isAdmin) {
        return null;
    }

    const [allUpdates, setAllUpdates] = useState([]);
    const [refreshUpdates, setRefreshUpdates] = useState(0);

    const approveUpdate = async (slug) => {
        const status = await axios.post(
            "/api/v1/superadmin/update/approve",
            {
                slug: slug,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "remember_token"
                    )}`,
                },
            }
        );

        if (!status) {
            return false;
        }

        return true;
    };

    const deleteUpdate = (slug) => {
        axios.post(
            "/api/v1/superadmin/update/delete",
            {
                slug: slug,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "remember_token"
                    )}`,
                },
            }
        ).then((res) => {
            setRefreshUpdates(refreshUpdates + 1);
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    };

    useEffect(() => {
        axios
            .get("/api/v1/superadmin/update/get", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "remember_token"
                    )}`,
                },
            })
            .then((res) => {
                // console.log(res.data);
                setAllUpdates(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [refreshUpdates]);

    return (
        <>
            <div className="my-8 p-4 border border-[#757575] rounded overflow-x-scroll">
                <p>Manage Updates</p>
                <div className="py-2">
                    <Link
                        href={`/admin/new-update`}
                        className="bg-green-800 py-1 px-4"
                    >
                        Create New
                    </Link>
                </div>
                {isSuperAdmin ? (
                <div>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Slug</th>
                                <th>Author Name</th>
                                <th>Date</th>
                                <th>Verification</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUpdates.map((update) => {
                                return (
                                    <tr>
                                        <td>{update.title}</td>
                                        <td>{update.slug}</td>
                                        <td>{update.author_name}</td>
                                        <td>
                                            {new Date(
                                                update.created_at
                                            ).toLocaleDateString()}
                                        </td>
                                        <td>
                                            <ToggleButon
                                                initState={update.approved}
                                                email={update.slug}
                                                callback={approveUpdate}
                                            />
                                        </td>
                                        <td>
                                            <Link
                                                href={`/admin/edit-update/${update.slug}`}
                                            >
                                                <img
                                                    className="opacity-60 hover:opacity-100 h-[1em]"
                                                    src={editButton}
                                                    alt=""
                                                />
                                            </Link>
                                        </td>
                                        <td>
                                            <button onClick={() => {deleteUpdate(update.slug)}}>
                                                <img
                                                    className="opacity-60 hover:opacity-100 h-[1em]"
                                                    src={deleteButton}
                                                    alt=""
                                                />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div> ): "Your updates need to be approved by the super admin, contact super admin once you have created a new update"}

            </div>
        </>
    );
};

export default ManageUpdates;
