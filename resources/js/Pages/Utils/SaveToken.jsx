import { useEffect } from "react";

const SaveToken = ({token}) => {


    useEffect(()=> {
        const isTokenSet = localStorage.setItem('remember_token', token);
        window.location.replace("/");
    }, []);


    return (
        <>
            {token}
        </>
    )
};

export default SaveToken;