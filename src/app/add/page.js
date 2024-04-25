"use client"
import React, { useContext, useState, useEffect } from 'react'
import {addNote} from "../utils/noteUtils.js"
import { useRouter } from 'next/navigation'
import { context } from '../Context/Context';
const getUuid = require('uuid-by-string');

function page() {
  const router = useRouter();


  const { notes, setNotes } = useContext(context);
  const [error, setError] = useState(null);

  

  const onSave = (event) => {
    const title = event.target.titleForm.value;
    const content = event.target.noteContent.value;

    try {
      if (title && content) {
        try {
          if (title.length < 100) {
            let titleExists = null;
            if (notes) {
              titleExists = notes.some((note) => note.title === title);
            }

            try {
              if (!titleExists) {
                const id = getUuid(title);
                const newNote = addNote(id, title, content);
                console.log(newNote);
                setNotes([...notes, newNote]);
                router.push("/");
              } else {
                throw new Error("title already exists");
              }
            } catch (error) {
              setError("title already exists");
              console.error(error);
            }



          } else {
            throw new Error("title is too long");
          }
        } catch (error) {
          setError("title is too long");
          console.error(error);
        }
      } else {
        throw new Error("fields are empty");
      }
    } catch (error) {
      setError("fields cant be empty");
      console.error(error);
    }
    event.preventDefault();

  }

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