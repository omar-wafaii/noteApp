"use client"
import React, { useState, useContext, useEffect } from 'react'
import { context } from '../Context/Context';
import { useSearchParams, useRouter } from 'next/navigation'
import { editNote } from '../Functions';




function page() {
  const { notes, setNotes  } = useContext(context);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pid = searchParams.get('id');
  const [note, setNote] = useState(null);
  const [placeTitle, setPlaceTitle] = useState(null);
  const [placeContent, setPlaceContent] = useState(null);
  const [error, setError] = useState(null);
  let foundNote = "";




  useEffect(() => {
    if (notes) {
      console.log(notes);
      foundNote = notes.find(note => note.id === pid);
      console.log(foundNote);
      setNote(foundNote);

      setPlaceTitle(foundNote.title);
      setPlaceContent(foundNote.content);
    }
  }, []);




  const edit = (event) => {

    event.preventDefault();
    const title = event.target.titleForm.value;
    const content = event.target.noteContent.value;
    try {
      if (title && content) {
        try {
          if (title.length < 100) {
            setNotes(editNote(pid,title,content,notes));
            router.push('/');
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

  }


  return (
    <main>
      <div>
        <form onSubmit={(event) => edit(event)}>
          <label>Title: </label>

          <input type="text" id="titleForm" name="titleForm" value={note ? placeTitle : ""} onChange={(e) => setPlaceTitle(e.target.value)} /><br />
          <label>Content</label><br />
          <input type="text" id="noteContent" name="noteContent" value={note ? placeContent : ""} onChange={(e) => setPlaceContent(e.target.value)} /><br />

          <button type='submit'>edit</button>
          {error && <p className='error'>{error}</p>}
        </form>
      </div>
    </main>
  )
}

export default page;