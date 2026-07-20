import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import BookTable from './components/BookTable';
import ApiUsers from './components/ApiUsers';

function App() {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem('library_books');
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  const [formData, setFormData] = useState({ id: '', title: '', author: '', genre: '', synopsis: ''});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem('library_books', JSON.stringify(books));
  }, [books]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setBooks(books.map(book => book.id === formData.id ? formData : book));
      setIsEditing(false);
    } else {
      setBooks([...books, { ...formData, id: uuidv4() }]);
    }
    setFormData({ id: '', title: '', author: '', genre: '', synopsis: '' });
  };

  const handleEdit = (book) => {
    setFormData(book);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if(window.confirm("¿Estás seguro de eliminar este registro")){
      setBooks(books.filter(book => book.id !== id));
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4"><i className="bi bi-book"></i> Gestor de Biblioteca</h1>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h4 className="card-title mb-3">{isEditing ? 'Editar Libro' : 'Nuevo Libro'}</h4>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Título</label>
              <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Autor</label>
              <input type="text" className="form-control" name="author" value={formData.author} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Género</label>
              <select className="form-select" name="genre" value={formData.genre} onChange={handleChange} required>
                <option value="">Seleccione...</option>
                <option value="Ficción">Ficción</option>
                <option value="No Ficción">No Ficción</option>
                <option value="Educativo">Educativo</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Sinopsis Corta</label>
              <input type="text" className="form-control" name="synopsis" value={formData.synopsis} onChange={handleChange} required />
            </div>
            <div className="col-12 text-end">
              <button type="submit" className={`btn ${isEditing ? 'btn-warning' : 'btn-primary'}`}>
                <i className={`bi ${isEditing ? 'bi-pencil' : 'bi-plus-circule'}`}></i> {isEditing ? 'Actualizar' : 'Agregar'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <BookTable books={books} onEdit={handleEdit} onDelete={handleDelete} />
      <ApiUsers />
    </div>
  );
}

export default App;