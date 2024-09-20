import MainWrapper from "../../Layout/MainWrapper";
import EditAccount from "./EditAccount/EditAccount";
import Username from "./Username/Username";

const Account = () => {

    

    return (
        <>
            <Username />
        </>
    )
}

Account.layout = (page) => <MainWrapper children={page} />;
export default Account;