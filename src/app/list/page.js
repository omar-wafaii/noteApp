"use client"
import React, { useState, useContext } from 'react'
import RouteButton from '../components/RouteButton';
import { useSearchParams } from 'next/navigation'
import { context } from '../Context/Context';

function page() {
    const {notes} = useContext(context);
    const searchParams = useSearchParams();
    const nid = searchParams.get('id');
    let note = "";
    if(notes){
    note = notes.find(note => note.id === nid);
    }
  return (
    <main className='show'>
        <div><h2>{note.title} </h2><RouteButton route="edit" id={note.id} /></div>
        <div>{note.content}</div>
    </main>
  )
}

export default page