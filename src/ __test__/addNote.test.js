import { addNote } from "../app/utils/noteUtils.js.js/index.js";
const getUuid = require('uuid-by-string');





describe('addNote function', () => {
    let notes = [];



    beforeEach(() => {
        notes = [];
    });

    it('should add a new note with valid title and content', () => {
        let note = "";
        const title = 'Test Note';
        const id = getUuid(title);
        const content = 'This is a test note';
        const newNote = addNote(id, title, content);
        expect(newNote.title).toBe(title);
        expect(newNote.content).toBe(content);
        expect(newNote.id).toBe(getUuid('Test Note'));
    });

    it('should throw an error when title is empty', () => {
        expect(() => addNote(1, '', 'Content')).toThrow('title or content are empty');
      });
    
      it('should throw an error when content is empty', () => {
        expect(() => addNote(1, 'Title', '')).toThrow('title or content are empty');
      });
});