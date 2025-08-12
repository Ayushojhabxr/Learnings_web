import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, Save, X, StickyNote } from 'lucide-react';

function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  // Load notes from localStorage on first render
  // useEffect(() => {
  //   const storedNotes = JSON.parse(localStorage.getItem('notes'));
  //   if (storedNotes) {
  //     setNotes(storedNotes);
  //   }
  // }, []);

  // // Save notes to localStorage whenever notes change
  // useEffect(() => {
  //   localStorage.setItem('notes', JSON.stringify(notes));
  // }, [notes]);


  const [isLoaded, setIsLoaded] = useState(false);

useEffect(() => {
  const storedNotes = JSON.parse(localStorage.getItem('notes'));
  if (storedNotes) setNotes(storedNotes);
  setIsLoaded(true);
}, []);

useEffect(() => {
  if (isLoaded) {
    localStorage.setItem('notes', JSON.stringify(notes));
  }
}, [notes, isLoaded]);

  const handleAddNote = () => {
    if (!input.trim()) return;
    setNotes([...notes, { id: Date.now(), text: input }]);
    setInput('');
  };

  const handleDelete = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const handleSaveEdit = (id) => {
    setNotes(notes.map(note => note.id === id ? { ...note, text: editText } : note));
    setEditId(null);
    setEditText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddNote();
    }
  };
  const handleEditKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      handleSaveEdit(id);
    }
  };

   return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <StickyNote className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Notes App
            </h1>
          </div>
          <p className="text-gray-600">Capture your thoughts and ideas</p>
        </div>

        {/* Add Note Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What's on your mind?"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 bg-white/80"
            />
            <button
              onClick={handleAddNote}
              disabled={!input.trim()}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-blue-200 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
            >
              <Plus className="w-5 h-5" />
              Add
            </button>
          </div>
        </div>

        {/* Notes List */}
        <div className="space-y-4">
          {notes.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <StickyNote className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">No notes yet</p>
              <p className="text-gray-400">Add your first note above to get started</p>
            </div>
          ) : (
            notes.map((note, index) => (
              <div
                key={note.id}
                className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-5 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.5s ease-out forwards'
                }}
              >
                {editId === note.id ? (
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={editText}
                      onChange={e => setEditText(e.target.value)}
                      onKeyPress={e => handleEditKeyPress(e, note.id)}
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none bg-white/80"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveEdit(note.id)}
                        className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 shadow-md hover:shadow-lg"
                        title="Save changes"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setEditId(null);
                          setEditText('');
                        }}
                        className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 shadow-md hover:shadow-lg"
                        title="Cancel editing"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <p className="text-gray-800 leading-relaxed break-words">{note.text}</p>
                      <div className="text-xs text-gray-400 mt-2">
                        {new Date(note.id).toLocaleString()}
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleEdit(note.id, note.text)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors duration-200 hover:shadow-md"
                        title="Edit note"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(note.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 hover:shadow-md"
                        title="Delete note"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {notes.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              {notes.length} note{notes.length !== 1 ? 's' : ''} total
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );

}

export default NotesApp;




// return (
//     <div style={{ 
//       maxWidth: 400, 
//       margin: '2rem auto', 
//       padding: 20, 
//       border: '1px solid #ccc', 
//       borderRadius: 8 
//     }}>
//       <h2>Notes App</h2>
      
//       <div style={{ display: 'flex', gap: 8 }}>
//         <input
//           type="text"
//           value={input}
//           onChange={e => setInput(e.target.value)}
//           placeholder="Add a note..."
//           style={{ flex: 1, padding: 8 }}
//         />
//         <button onClick={handleAddNote}>Add</button>
//       </div>

//       <ul style={{ listStyle: 'none', padding: 0, marginTop: 20 }}>
//         {notes.map(note => (
//           <li 
//             key={note.id} 
//             style={{ 
//               display: 'flex', 
//               alignItems: 'center', 
//               marginBottom: 12, 
//               background: '#f9f9f9', 
//               padding: 10, 
//               borderRadius: 6 
//             }}
//           >
//             {editId === note.id ? (
//               <>
//                 <input
//                   type="text"
//                   value={editText}
//                   onChange={e => setEditText(e.target.value)}
//                   style={{ flex: 1, marginRight: 8 }}
//                 />
//                 <button 
//                   onClick={() => handleSaveEdit(note.id)} 
//                   style={{ marginRight: 4 }}
//                 >
//                   Save
//                 </button>
//                 <button onClick={() => setEditId(null)}>Cancel</button>
//               </>
//             ) : (
//               <>
//                 <span style={{ flex: 1 }}>{note.text}</span>
//                 <button 
//                   onClick={() => handleEdit(note.id, note.text)} 
//                   style={{ marginRight: 4 }}
//                 >
//                   Edit
//                 </button>
//                 <button onClick={() => handleDelete(note.id)}>Delete</button>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );