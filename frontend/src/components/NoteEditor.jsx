import React, { useEffect, useState } from 'react';

export default function NoteEditor({ onCreate, editing, onUpdate }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setContent(editing.content || '');
    } else {
      setTitle('');
      setContent('');
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
    setTitle('');
    setContent('');
  }

  return (
    <form className="note-editor" onSubmit={submit}>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
      <button type="submit">{editing ? 'Update' : 'Create'}</button>
    </form>
  );
}
