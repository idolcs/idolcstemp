import MainWrapper from "../../Layout/MainWrapper";

const TermsAndConditions = () => {
    return (
        <>
            <h1 className="text-[1.5em] font-bold">Terms and Conditions</h1>

            <div className="mt-4 flex flex-col gap-2">
                <p>
                    Welcome to IDOLCS.com, a platform for students of the
                    Institute of Distance and Open Learning (IDOL), Mumbai
                    University, to share notes and educational resources. By
                    accessing or using our website, you agree to the following
                    terms and conditions:
                </p>

                <h2>1. Acceptance of Terms</h2>
                <p>
                    By using IDOLCS.com, you agree to be bound by these terms
                    and conditions. If you do not agree with any part of these
                    terms, you should not use the website.
                </p>

                <h2>2. No Obligation to Deliver Content</h2>
                <p>
                    We strive to provide useful and educational content on
                    IDOLCS.com. However, we are under no obligation to provide
                    or deliver any specific content or services. The
                    availability of content is subject to change at our
                    discretion and may be removed or modified without prior
                    notice.
                </p>

                <h2>3. Content Accuracy and Responsibility</h2>
                <p>
                    The content available on IDOLCS.com is provided by students
                    and other contributors. While we aim to foster a helpful
                    educational environment,{" "}
                    <strong>
                        we do not guarantee the accuracy, completeness, or
                        reliability
                    </strong>{" "}
                    of the content shared on the platform.
                </p>
                <p>
                    Users are encouraged to verify the accuracy of any notes or
                    materials before using them for educational purposes.
                    IDOLCS.com is not responsible for any errors, omissions, or
                    inaccuracies in the content, nor for any loss or damage
                    resulting from reliance on the information provided.
                </p>

                <h2>4. User Contributions</h2>
                <p>
                    As a user of IDOLCS.com, you may contribute notes and other
                    educational materials. By submitting content, you grant us
                    the right to display, share, and use your contributions for
                    the purposes of the platform. You are solely responsible for
                    the content you submit, and you agree not to upload any
                    content that is false, misleading, or in violation of any
                    third-party rights.
                </p>

                <h2>5. No Warranties</h2>
                <p>
                    We provide the website and its content "as is" and "as
                    available," without any warranties, either express or
                    implied. We do not warrant that the website will be
                    uninterrupted, error-free, or free of harmful components.
                    Your use of the website is at your own risk.
                </p>

                <h2>6. Limitation of Liability</h2>
                <p>
                    To the fullest extent permitted by law, IDOLCS.com and its
                    owners, administrators, or contributors shall not be liable
                    for any direct, indirect, incidental, special,
                    consequential, or punitive damages arising out of your use
                    or inability to use the website or any content on it.
                </p>

                <h2>7. Changes to These Terms</h2>
                <p>
                    We reserve the right to modify these Terms and Conditions at
                    any time without prior notice. Any changes will be posted on
                    this page with the updated effective date. Your continued
                    use of the website after changes are made constitutes your
                    acceptance of the new terms.
                </p>

                <h2>8. Governing Law</h2>
                <p>
                    These Terms and Conditions are governed by the laws of
                    India. Any disputes arising from or in connection with the
                    use of IDOLCS.com will be subject to the exclusive
                    jurisdiction of the courts of Mumbai, Maharashtra, India.
                </p>

                <h2>9. Contact Us</h2>
                <p>
                    If you have any questions or concerns about these Terms and
                    Conditions, please contact us at:
                </p>
                <p>
                    <strong>Email:</strong> hi@idolcs.com
                </p>

                <p>
                    By using IDOLCS.com, you agree to these Terms and
                    Conditions.
                </p>
            </div>
        </>
    );
};

TermsAndConditions.layout = (page) => <MainWrapper children={page} />;
export default TermsAndConditions;
