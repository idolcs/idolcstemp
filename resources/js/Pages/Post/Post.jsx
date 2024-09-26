import MainWrapper from "../../Layout/MainWrapper";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import "../../../css/blog.css";
import { jsx } from "react/jsx-runtime";

const Post = ({update}) => {

    return (
        <>
            <p className="text-[1.5em] font-bold">
                {update.title}
            </p>
            <p className="text-[0.8em] mt-2">
                {(new Date(update.created_at)).toDateString()}, {update.author_name}
            </p>
            <div className="mt-8 blogpostarea">
                <ReactMarkdown remarkPlugins={[[remarkGfm, {singleTilde: false}]]}>
                    {update.content}
                </ReactMarkdown>
            </div>
        </>
    );
};

Post.layout = (page) => <MainWrapper children={page} />;
export default Post;
