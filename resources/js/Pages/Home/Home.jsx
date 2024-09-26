import MainWrapper from "../../Layout/MainWrapper";
import About from "./About/About";
import JoinCommunity from "./JoinCommunity/JoinCommunity";
import LatestUpdates from "./LatestUpdates/LatestUpdates";
import SelectSemester from "./SelectSemester/SelectSemester";

const Home = ({activeSemesters, updates}) => {
    return (
        <>
            <p>
                IDOL CS is a community for students pursuing BSc CS in CDOE
                (formerly IDOL) in Mumbai University
            </p>

            <SelectSemester  activeSemesters={activeSemesters} />
            <LatestUpdates updates={updates} />
            <JoinCommunity />
            <About  />

        </>
    );
};

Home.layout = (page) => <MainWrapper children={page} />;
export default Home;
