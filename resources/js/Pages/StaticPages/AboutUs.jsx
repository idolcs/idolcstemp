import MainWrapper from "../../Layout/MainWrapper";

const AboutUs = () => {
    return (
        <>
            <h1 className="text-[1.5em] font-bold">About us</h1>

            <div className="mt-4 flex flex-col gap-2">
                <p className="italic">
                    IDOL CS is a community for students pursuing BSc CS in CDOE
                    (formerly IDOL) in Mumbai University
                </p>
                <p>
                    We are trying to solve the "lack of communication" and "lack
                    of a platform for note sharing" which is not exclusive to
                    CDOE (formerly IDOL) but becomes very important when it
                    comes to CDOE (formerly IDOL) as it functions under a
                    distance model.
                </p>
                <p>
                    IDOL CS is only for students pursuing B.Sc. Computer Science
                    but the infrastructure can be replicated by anyone as
                    everything is{" "}
                    <a
                        className="underline decoration-dotted underline-offset-3"
                        href="https://github.com/idolcs"
                    >
                        open source
                    </a>{" "}
                    and free to use.
                </p>
                <p>
                    We believe in the idea of a singular platform where a
                    student will get everything that is required for their
                    educational journey. And We are working for it!
                </p>
            </div>
        </>
    );
};

AboutUs.layout = (page) => <MainWrapper children={page} />;
export default AboutUs;
