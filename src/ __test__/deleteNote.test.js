import { deleteNote } from "../app/Functions.js";

describe('deleteNote function', () => {

    let notes =[
        {
            "id": "2f3c6b82-e94a-5bef-bdcc-4ac1d00fcfb4",
            "title": "test 1",
            "content": "first test"
        },
        {
            "id": "ccf587c7-7d3c-5468-92e2-1674ed3b95cb",
            "title": "test 2",
            "content": "second test"
        }
    ];
  
    it('should delete a note when it exists', () => {
      const updatedNotes = deleteNote("2f3c6b82-e94a-5bef-bdcc-4ac1d00fcfb4", notes);
      expect(updatedNotes).toHaveLength(1);
      expect(updatedNotes[0].id).toBe("ccf587c7-7d3c-5468-92e2-1674ed3b95cb"); 
    });
  
    it('should return an empty array when deleting the only existing note', () => {
      const singleNote = [{ id: 1, title: 'Lone Note', content: 'Content' }];
      const updatedNotes = deleteNote(1, singleNote);
      expect(updatedNotes).toEqual([]);
    });
  
    it('should throw an error when note with given id does not exist', () => {
      const nonExistentId = 3;
      expect(() => deleteNote(nonExistentId, notes)).toThrow('deleted note does not exist');
    });
  
  });