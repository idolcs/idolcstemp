import axios from "axios";
import { useEffect, useState } from "react";

const ManageRedirects = ({ isSuperAdmin, isAdmin }) => {
    if (!isSuperAdmin && !isAdmin) {
        return null;
    }

    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [redirects, setRedirects] = useState([]);
    const [refreshRedirects, setRefreshRedirects] = useState(0);


    useEffect(() =>{
        axios.get("/api/v1/admin/redirect/get/last10", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(
                    "remember_token"
                )}`,
            },
        }).then((res) => {
            setRedirects(res.data);
            console.log(res.data);
        }).catch((err) => {
            console.error(err);
        })
    }, [refreshRedirects]);

    const newRedirect = () => {
        axios.post("/api/v1/admin/redirect/new", {
            title: title,
            url: url
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(
                    "remember_token"
                )}`,
            },
        }).then((res) => {
            alert(`Redirect created -> ${res.data.id}`)
            setRefreshRedirects(refreshRedirects + 1);
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
            <div className="p-4 border border-[#858585]">
                <p>Manage Redirects</p>

                <div className="border border-[#858585] p-2 mt-2">
                    <p>Create Redirect</p>
                    <div className="p-2">
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onInput={(e) => {
                                setTitle(e.target.value);
                            }}
                            className="bg-gray-800 p-2 w-full "
                        />
                    </div>
                    <div className="p-2">
                    <input
                            type="text"
                            value={url}
                            onInput={(e) => {
                                setUrl(e.target.value);
                            }}
                            placeholder="URL"
                            className="bg-gray-800 p-2 w-full "
                        />
                    </div>
                    <div className="p-2">
                        <button
                        onClick={newRedirect}
                        className="py-2 px-8 bg-green-800">Submit</button>
                    </div>
                </div>
                <div className="p-2 rounded overflow-x-auto">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>title</th>
                                        <th>url</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        redirects.map((redirect) => {
                                            return (
                                                <tr>
                                                    <td>{redirect.id}</td>
                                                    <td>{redirect.title}</td>
                                                    <td>{redirect.url}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                </div>
            </div>
        </>
    );
};

export default ManageRedirects;
