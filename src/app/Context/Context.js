"use client"
import React, { createContext, useState, useEffect, } from 'react'
import { v4 as uuidv4 } from 'uuid';
export const context = createContext();



function ContextProvider({ children }) {

  const [notes, setNotes] = useState([]);
  const [storageLoaded, setStorageLoaded] = useState(false);

  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    try {
      if (storedNotes !== null) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error("cant parse from localstorage to notes");
    } finally {
      setStorageLoaded(true);
    }

  }, []);

  useEffect(() => {
    
    if (storageLoaded) {
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  }, [notes, storageLoaded]);


  const addNote = (id,title, content) => {
    let newNote = [];
    try {
      if (title && content) {
        
        newNote = {id,title,content};
        return newNote;
      } else {
        throw new Error("title or content are empty");
      }
    } catch (error) {
      console.error("title or content are empty");
    }
    return newNote;
  };

  const deleteNote = (nid) => {
    const noteExists = notes.some((note) => note.id === nid);
    let newNote = "";
    try {
      if (noteExists) {
        if (notes.length === 1 && notes[0].id == nid) {
          newNote = [];
          return newNote;
        } else {
          newNote = [...notes].filter((note) => note.id !== nid)
          return newNote;
        }
      } else {
        throw new Error("deleted note does not exist");
      }
    } catch (error) {
      console.error("the selected deleted note with the following id " + nid + " does not exist");
    }

    return notes;
  }
  const editNote = (nid, title, content) => {
    const noteExists = notes.some((note) => note.id === nid);
    let editedNote = "";
    try {
      if (noteExists) {
        try {
          if (title && content) {
            editedNote = prevNotes => prevNotes.map(note =>
              note.id === nid ? { ...note, title, content } : note
            );
              return editedNote;
          } else {
            throw new Error("title or content are empty");
          }
        } catch (error) {
          console.error("title or content are empty title:" + title + "content:" + content);
        }
      } else {
        throw new Error("note with the following id doesnt exist");
      }
    } catch (error) {
      console.error("note with the following id doesnt exist");
    }
    return editedNote ;

  }

  return (
    <context.Provider value={{ notes, setNotes, addNote, deleteNote, editNote }}>
      {children}
    </context.Provider>
  )
}

export default ContextProvider;