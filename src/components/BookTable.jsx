import React from 'react';
import BookRow from './BookRow';

const BookTable = ({ books, onDelete, onEdit }) => {
    return (
        <div className="table-responsive mt-4">
            <table className="table table-striped table-hover shadow-sm">
                <thead className="table-dark">
                    <tr>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Género</th>
                        <th>Sinopsis</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {books.length > 0 ? (
                        books.map((book) => (
                            <BookRow key={book.id} book={book} onDelete={onDelete} onEdit={onEdit} />
                        ))
                    ) : (
                        <tr>
                            <td colSapn="5" className="text-center">No hay libros registrados.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BookTable;