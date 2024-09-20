import axios from "axios";
import { useEffect, useState } from "react";
import CalendarIcon from "../../../../../public/assets/calendar-days-svgrepo-com(1).svg";
import EmailIcon from "../../../../../public/assets/email-svgrepo-com.svg";
import pencilIcon from "../../../../../public/assets/pencil-svgrepo-com.svg";
import EditAccount from "../EditAccount/EditAccount";

const Username = () => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        avatar: "",
        semester: "",
    });

    useEffect(() => {
        const rememberToken = localStorage.getItem("remember_token");
        if (rememberToken != null) {
            axios
                .post("/api/v1/user/verify-token", {
                    token: rememberToken,
                })
                .then((res) => {
                    setUserData(res.data);
                    console.log(userData);
                })
                .catch((err) => {
                    return window.location.replace("/account/login");
                });
        } else {
            return window.location.replace("/account/login");
        }
    }, []);

    const changeSemester = (e) => {
        e.preventDefault();
        axios.post("/api/v1/user/change-semester", {
            token: localStorage.getItem("remember_token"),
            semester: e.target.value  
        }).then((res) => {
            window.location.reload();
        }).catch((err) => {
            console.error(err);
        })
    }

    return (
        <>
            <div className="w-full">
                <div
                    style={{
                        background: "rgb(217,217,217)",
                        background:
                            "linear-gradient(12deg, rgba(217,217,217,0.1) 0%, rgba(0,212,255,0) 50%)",
                    }}
                    className="flex flex-col gap-1 mt-1 py-4 px-4 border border-[#535353] rounded-lg"
                >
                    <div className="w-fit flex items-center justify-center gap-2">
                        <img
                            className="h-[2.5em] rounded-full"
                            src={userData.avatar}
                            alt=""
                        />
                        <p className="text-[1.2em]">{userData.name}</p>
                    </div>
                    <div className="flex flex-col gap-1 mt-1">
                        <div className="flex items-center gap-1">
                            <img className="h-[1.2em]" src={EmailIcon} alt="" />
                            <p>{userData.email}</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <img
                                className="h-[1.2em]"
                                src={CalendarIcon}
                                alt=""
                            />
                            {userData.semester ? (
                                <p>Semester {userData.semester} </p>
                            ) : (
                                <>
                                    <p>Select a semester {"->"} </p>
                                    <select onChange={changeSemester} className="bg-black" name="" id="">
                                        <option selected disabled value="">--select--</option>
                                        <option value="1">Semester 1</option>
                                        <option value="2">Semester 2</option>
                                        <option value="3">Semester 3</option>
                                        <option value="4">Semester 4</option>
                                        <option value="5">Semester 5</option>
                                        <option value="6">Semester 6</option>
                                    </select>
                                </>
                            )}
                        </div>
                    </div>
                    <EditAccount />
                </div>
            </div>
        </>
    );
};

export default Username;
