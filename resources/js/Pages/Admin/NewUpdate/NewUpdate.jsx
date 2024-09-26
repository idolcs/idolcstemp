import MainWrapper from "../../../Layout/MainWrapper";
// import { MDXEditor } from '@mdxeditor/editor'
import {
    MDXEditor,
    UndoRedo,
    BoldItalicUnderlineToggles,
    toolbarPlugin,
    linkPlugin,
    linkDialogPlugin,
    CreateLink,
    InsertImage,
    imagePlugin,
    InsertTable,
    InsertThematicBreak,
    tablePlugin,
    quotePlugin,
    BlockTypeSelect,
    listsPlugin,
    ListsToggle,
    CodeToggle,
    thematicBreakPlugin,
} from "@mdxeditor/editor";

import "@mdxeditor/editor/style.css";
import { useState } from "react";

const NewUpdate = ({edit={}}) => {

    // if(!(edit.slug === undefined)){
    //     setSlug(edit.slug);
    // }
    
    const [slug, setSlug] = useState(edit.slug ? edit.slug : "");
    const [title, setTitle] = useState(edit.title ? edit.title : "");
    const [semester, setSemester] = useState(edit.semester ? edit.semester : "");
    const [postContent, setPostContent] = useState(edit.content ? edit.content : ``);

    const handlePost = (input) => {
        setPostContent(input);
    };

    const submitUpdate = () => {
        axios
            .post(
                "/api/v1/admin/new-update",
                {
                    title: title,
                    slug: slug,
                    content: postContent,
                    semester: semester,
                    isEdit: edit.slug ? true : false
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "remember_token"
                        )}`,
                    },
                }
            )
            .then((res) => {
                alert("The post has been created");
                window.location.href = "/admin";
            })
            .catch((err) => {
                alert(err.response.data.msg);
            });
    };

    return (
        <>
            <div>
                <p className="text-[1.5em] font-bold">Create a new update</p>
                <div className="flex flex-col gap-4 mt-4">
                    <input
                        className="p-2 bg-[#222]"
                        type="text"
                        placeholder="insert-post-url-here"
                        value={slug}
                        onChange={(e) => {
                            if (e.target.value == "") {
                                setSlug("");
                            } else if (
                                e.target.value.match("[a-z0-9-]+") != null
                            ) {
                                setSlug(e.target.value);
                            }
                        }}
                    />
                    <input
                        className="p-2 bg-[#222]"
                        type="text"
                        placeholder="Post Title"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                    <select
                        onChange={(e) => {
                            setSemester(e.target.value);
                        }}
                        className="p-2 bg-[#222]"
                        name=""
                        id=""
                    >
                        <option selected disabled>
                            --Select Semester--
                        </option>
                        <option value="0">General</option>
                        <option value="1">Sem 1</option>
                        <option value="2">Sem 2</option>
                        <option value="3">Sem 3</option>
                        <option value="4">Sem 4</option>
                        <option value="5">Sem 5</option>
                        <option value="6">Sem 6</option>
                    </select>
                    <div className="bg-white p-2 rounded-md">
                        <MDXEditor
                            markdown={postContent}
                            plugins={[
                                linkPlugin(),
                                linkDialogPlugin(),
                                imagePlugin(),
                                tablePlugin(),
                                listsPlugin(),
                                thematicBreakPlugin(),
                                toolbarPlugin({
                                    toolbarContents: () => (
                                        <>
                                            {" "}
                                            <UndoRedo />
                                            <BoldItalicUnderlineToggles />
                                            <CreateLink />
                                            <CodeToggle />
                                            <InsertImage />
                                            <InsertThematicBreak />
                                            <ListsToggle />
                                            <InsertTable />
                                            <BlockTypeSelect />
                                        </>
                                    ),
                                }),
                            ]}
                            onChange={handlePost}
                        />
                    </div>
                    <div>
                        <button
                            onClick={submitUpdate}
                            className="p-2 px-10 rounded bg-[#0bb80b] hover:bg-[#198619]"
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

NewUpdate.layout = (page) => <MainWrapper children={page} />;
export default NewUpdate;
