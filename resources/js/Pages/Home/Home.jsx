import MainWrapper from "../../Layout/MainWrapper";
import JoinCommunity from "./JoinCommunity/JoinCommunity";
import LatestUpdates from "./LatestUpdates/LatestUpdates";
import SelectSemester from "./SelectSemester/SelectSemester";

const Home = () => {
    return (
        <>
            <p>
                IDOL CS is a community for students pursuing BSc CS in CDOE
                (formerly IDOL) in Mumbai University
            </p>

            <SelectSemester />
            <LatestUpdates />
            <JoinCommunity />

        </>
    );
};

Home.layout = (page) => <MainWrapper children={page} />;
export default Home;
