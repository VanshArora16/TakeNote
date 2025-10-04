import React from "react";
import { CirclePlus, PencilLineIcon, Trash2 } from "lucide-react";

export default function NoteList({ notes, onEdit, onDelete }) {
    return (
        <div className="flex justify-center transition-all duration-300 ease-in-out">
            <div className="w-xl">
                {notes.length === 0 && (
                    <div className="flex justify-center items-center opacity-40 text-4xl uppercase overflow-hidden space-x-2">
                        <CirclePlus className="w-10 h-30" />
                        <p>Add a note</p>
                    </div>
                )}
                {notes.map((note) => (
                    <div
                        key={note.id}
                        className={`m-5 
                            ${
                                note.id % 2 === 0
                                    ? "bg-[#533A7B]"
                                    : "bg-[#4B244A]"
                            } 
                            p-5 rounded-2xl`}
                    >
                        <h3 className="text-3xl font-bold mb-2 capitalize">
                            {note.title}
                        </h3>
                        <div className="w-40 h-1 bg-[#98C1D9] mb-1.5" />
                        <p className="text-xl tracking-wide text-justify">
                            {note.content}
                        </p>
                        <div className="m-2 flex justify-end gap-5">
                            <button
                                title="Edit"
                                onClick={() => onEdit(note)}
                                className="border-2 rounded-xl p-2 hover:bg-green-800 transition-all duration-100 ease-in-out"
                            >
                                <PencilLineIcon />
                            </button>
                            <button
                                title="Delete"
                                onClick={() => onDelete(note.id)}
                                className="border-2 rounded-xl p-2 hover:bg-red-800 transition-all duration-100 ease-in-out"
                            >
                                <Trash2 />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
