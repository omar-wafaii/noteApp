import { editNote } from "../app/Functions.js";

describe('editNote function', () => {
    let notes = [
        {
            "id": "2f3c6b82-e94a-5bef-bdcc-4ac1d00fcfb4",
            "title": "test 1",
            "content": "first test"
        },
        {
            "id": "ccf587c7-7d3c-5468-92e2-1674ed3b95cb",
            "title": "test 2",
            "content": "second test"
        },
        {
            "id": "8c7e89ed-f024-5496-8238-977b4a3acd23",
            "title": "test 3",
            "content": "third test"
        }
    ]



    beforeEach(() => {
        notes = [
            {
                "id": "2f3c6b82-e94a-5bef-bdcc-4ac1d00fcfb4",
                "title": "test 1",
                "content": "first test"
            },
            {
                "id": "ccf587c7-7d3c-5468-92e2-1674ed3b95cb",
                "title": "test 2",
                "content": "second test"
            },
            {
                "id": "8c7e89ed-f024-5496-8238-977b4a3acd23",
                "title": "test 3",
                "content": "third test"
            }
        ];
    });

    it('should edit a note when it exists and title/content are valid', () => {
        const newTitle = 'Updated title';
        const newContent = 'Updated tontent';
        const updatedNotes = editNote("2f3c6b82-e94a-5bef-bdcc-4ac1d00fcfb4", newTitle, newContent, notes);
        expect(updatedNotes[0].title).toBe(newTitle);
        expect(updatedNotes[0].content).toBe(newContent);
      });

      it('should throw an error when note with given id does not exist', () => {
        const nonExistentId = 3;
        expect(() => editNote(nonExistentId, 'title', 'test', notes)).toThrow('note with the following id doesnt exist');
      });
    
      it('should throw an error when title is empty', () => {
        expect(() => editNote("ccf587c7-7d3c-5468-92e2-1674ed3b95cb", 'test',"", notes)).toThrow('title or content are empty');
      });
    
      it('should throw an error when content is empty', () => {
        expect(() => editNote("ccf587c7-7d3c-5468-92e2-1674ed3b95cb", 'title', '', notes)).toThrow('title or content are empty');
      });
});