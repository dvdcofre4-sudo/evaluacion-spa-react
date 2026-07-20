import React from 'react';

const BookRow = ({ book, onDelete, onEdit }) => {
    return (
        <tr>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.genre}</td>
            <td>{book.synopsis}</td>
            <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => onEdit(book)}>
                    <i className="bi bi-pencil-square"></i> Editar
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => onDelete(book.id)}>
                    <i className="bi bi-trash"></i> Eliminar
                </button>
            </td>
        </tr>
    );
};

export default BookRow;
