"use client"
import React, { useContext, useState, useEffect } from 'react'
import { addNote } from "../utils/noteUtils.js"
import { useRouter } from 'next/navigation'
import { context } from '../Context/Context';
const getUuid = require('uuid-by-string');

function page() {
  const router = useRouter();


  const { notes, setNotes } = useContext(context);
  const [error, setError] = useState(null);



  const onSave = (event) => {
    event.preventDefault();

    const title = event.target.titleForm.value;
    const content = event.target.noteContent.value;

    if (!title || !content) {
      setError("Fields cannot be empty");
      return;
    }

    if (title.length >= 100) {
      setError("Title is too long");
      return;
    }

    const titleExists = notes?.some((note) => note.title === title);
    if (titleExists) {
      setError("Title already exists");
      return;
    }

    const id = getUuid(title);
    const newNote = addNote(id, title, content);
    setNotes([...notes, newNote]);
    router.push("/");
  };




  return (
    <main>
      <form onSubmit={(event) => onSave(event)}>
        <label>Title: </label>
        <input type="text" id="titleForm" name="titleForm" /><br />
        <label>Content</label><br />
        <input type="text" id="noteContent" name="noteContent" /><br />
        <button type='submit'>save</button>
        {error && <p className='error'>{error}</p>}
      </form>

    </main>

  )
}

export default page;