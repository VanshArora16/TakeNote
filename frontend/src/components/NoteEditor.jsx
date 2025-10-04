import { BadgePlus, PencilLine } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function NoteEditor({ onCreate, editing, onUpdate }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (editing) {
            setTitle(editing.title);
            setContent(editing.content || "");
        } else {
            setTitle("");
            setContent("");
        }
    }, [editing]);

    function submit(e) {
        e.preventDefault();
        const payload = { title, content };
        if (editing) {
            onUpdate(editing.id, payload);
        } else {
            onCreate(payload);
        }
        setTitle("");
        setContent("");
    }

    return (
        <form
            className="flex flex-col p-4 items-center justify-center min-h-[300px]"
            onSubmit={submit}
        >
            <input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="border-2 p-3 rounded-2xl m-2 w-[100%]"
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border-2 p-3 rounded-2xl m-2 w-[100%] h-40"
            />
            
            <button
                type="submit"
                className="border-2 p-3 rounded-2xl m-2 w-[100%] hover:text-black text-lg hover:bg-[#98C1D9] transition-all duration-100 ease-in-out flex items-center justify-center"
                title={editing ? "update" : "create"}
            >
                {editing ? <PencilLine /> : <BadgePlus />}
            </button>
        </form>
    );
}
