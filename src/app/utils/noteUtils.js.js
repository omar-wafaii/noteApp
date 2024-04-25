const addNote = (id, title, content) => {
    
    if (!title || !content) {
        throw new Error("title or content are empty");
    }

    const newNote = { id, title, content };
    return newNote;
};

const deleteNote = (nid, notes) => {
    const noteExists = notes.some((note) => note.id === nid);

    if (!noteExists) {
        throw new Error("deleted note does not exist");
    }

    if (notes.length === 1 && notes[0].id === nid) {
        return [];
    } else {
        return notes.filter((note) => note.id !== nid);
    }
};

const editNote = (nid, title, content, notes) => {

    const noteExists = notes.find((note) => note.id === nid);

    if (!noteExists) {
        throw new Error("note with the following id doesnt exist");
    }

    if (!title || !content) {
        throw new Error("title or content are empty");
    }

    const editedNote = notes.map(note =>
        note.id == nid ? { ...note, title, content } : note
    );
    console.log(editedNote);
    return editedNote;
};

export { addNote, editNote, deleteNote };