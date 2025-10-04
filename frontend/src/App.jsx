import React, { useEffect, useState } from "react";
import { fetchNotes, createNote, updateNote, deleteNote } from "./api";
import NoteList from "./components/NoteList";
import NoteEditor from "./components/NoteEditor";

function App() {
    const [notes, setNotes] = useState([]);
    const [editing, setEditing] = useState(null);

    useEffect(() => {
        load();
    }, []);

    async function load() {
        const data = await fetchNotes();
        setNotes(data);
    }

    async function handleCreate(note) {
        const created = await createNote(note);
        setNotes((prev) => [created, ...prev]);
    }

    async function handleUpdate(id, note) {
        const updated = await updateNote(id, note);
        setNotes((prev) => prev.map((n) => (n.id === id ? updated : n)));
        setEditing(null);
    }

    async function handleDelete(id) {
        await deleteNote(id);
        setNotes((prev) => prev.filter((n) => n.id !== id));
    }

    return (
        <>
            <div className="items-center justify-center flex flex-col">
                <h1 className="text-4xl p-4 text-center">TakeNote</h1>
                <div className="w-30 h-1 bg-[#98C1D9] mb-1.5" />
            </div>
            <div className="flex flex-col md:flex-row gap-4 p-4 h-screen overflow-hidden">
                <div className="md:w-1/2 overflow">
                    <NoteEditor
                        className=""
                        onCreate={handleCreate}
                        editing={editing}
                        onUpdate={handleUpdate}
                    />
                </div>
                <div className="md:w-1/2 overflow-auto">
                    <NoteList
                        notes={notes}
                        onEdit={setEditing}
                        onDelete={handleDelete}
                    />
                </div>
            </div>
        </>
    );
}

export default App;
