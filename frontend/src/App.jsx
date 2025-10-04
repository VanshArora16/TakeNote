import React, { useEffect, useState } from 'react';
import { fetchNotes, createNote, updateNote, deleteNote } from './api';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';


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
setNotes(prev => [created, ...prev]);
}


async function handleUpdate(id, note) {
const updated = await updateNote(id, note);
setNotes(prev => prev.map(n => (n.id === id ? updated : n)));
setEditing(null);
}


async function handleDelete(id) {
await deleteNote(id);
setNotes(prev => prev.filter(n => n.id !== id));
}


return (
<div className="container">
<h1>TakeNote</h1>
<NoteEditor onCreate={handleCreate} editing={editing} onUpdate={handleUpdate} />
<NoteList notes={notes} onEdit={setEditing} onDelete={handleDelete} />
</div>
);
}


export default App;