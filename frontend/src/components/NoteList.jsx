import React from "react";

export default function NoteList({ notes, onEdit, onDelete }) {
    return (
        <div className="note-list">
            {notes.length === 0 && <p>No notes yet.</p>}
            {notes.map((note) => (
                <div key={note.id} className="note-card">
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                    <div className="actions">
                        <button onClick={() => onEdit(note)}>Edit</button>
                        <button onClick={() => onDelete(note.id)}>
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
