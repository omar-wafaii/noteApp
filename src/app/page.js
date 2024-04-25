"use client"
import React, { useContext, useState, useEffect } from 'react';
import { deleteNote } from './utils/noteUtils.js';
import RouteButton from "./components/RouteButton";
import Link from 'next/link'
import styles from "./globals.css"
import { context } from './Context/Context.js'




export default function Home() {
  
  const { notes, setNotes } = useContext(context);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  console.log(notes);

  let ArrayNotes = [];
  if (notes) {
    ArrayNotes = Array.from(notes);
  }




  const handleDelete = (id) => {
    setShowModal(true);
    setDeleteId(id);
  }

  const confirmDelete = (e) => {

    if (e == "yes") {
      setNotes(deleteNote(deleteId,notes));
    }
    setShowModal(false);
  }





  return (
    <main className="main">
      <div className="welcome"><h3>welcome to my note taking app </h3><RouteButton name="add" route="add" /></div>
      <div className="appFunc">
        <div><h3><p>list of notes</p></h3></div>
        {ArrayNotes.sort((a, b) => a.title.localeCompare(b.title)).map((note) => (
          <div key={note.id} className='lNote'>
            <div><h3><Link href={{ pathname: "/list", query: { id: `${note.id}` } }}>{note.title}</Link></h3></div>
            <div><RouteButton name="edit" route="edit" id={note.id} />
              <button onClick={() => handleDelete(note.id)}>Delete</button></div>
          </div>
        ))}

      </div>
      {showModal && (<div className='modal'>

        Are you sure you want to delete this note?

        <button onClick={() => confirmDelete("yes")}>Yes</button>
        <button onClick={() => confirmDelete("no")}>No</button>
      </div>)
      }
    </main>
  );
}
