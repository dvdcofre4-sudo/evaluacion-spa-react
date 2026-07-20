import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApiUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Error al obtener datos:", error);
        setError("Hubo un problema al cargar los datos.");
      });
  }, []);

  return (
    <div className="mt-5 p-4 bg-light rounded shadow-sm">
      <h3 className="mb-3"><i className="bi bi-cloud-download"></i> Autores Sugeridos (API)</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table table-bordered table-sm bg-white">
          <thead className="table-primary">
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Sitio Web</th>
            </tr>
          </thead>
          <tbody>
            {users.slice(0, 5).map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.website}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApiUsers;