import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data));
  }, [users]);

  const handleAddUser = (event) => {
    event.preventDefault();
    const form =  event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {name, email};
    form.reset();
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      const newUsers = [...users, data];
      setUsers(newUsers);
    });
  }

  return (
    <>
      <h2>Users Management</h2>
      <h3>Numbers of users: {users.length} </h3>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <button>Add</button>
      </form>
      {
        users.map(user => <p key={user.id}>{user.name}</p>)
      }
    </>
  )
}

export default App
