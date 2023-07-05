import React from 'react'
import './crud.css'
import { useState, useEffect } from 'react';

const Crud = () => {
  const [data, setData] = useState([])
  const [currentEditItem, setCurrentEditItem] = useState(null)
  const [editedValues, setEditedValues] = useState({
    name: '',
    username: '',
    email: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const json = await response.json()
        setData(json)
      } catch (error) {
        console.log('Error fetching data', error)
      }
    }

    fetchData()
  }, [])

  const handleEdit = (id) => {
    const itemToEdit = data.find(item => item.id === id)
    setCurrentEditItem(itemToEdit)
    setEditedValues({
      name: itemToEdit.name,
      username: itemToEdit.username,
      email: itemToEdit.email
    })
  }

  const handleChange = (e) => {
    setEditedValues({
      ...editedValues,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedData = data.map(item => {
      if (item.id === currentEditItem.id) {
        return {
          ...item,
          name: editedValues.name,
          username: editedValues.username,
          email: editedValues.email
        }
      }
      return item
    })
    setData(updatedData)
    setCurrentEditItem(null)
    setEditedValues({
      name: '',
      username: '',
      email: ''
    })
  }

  const handleDelete = (id) => {
    const updatedData = data.filter(item => item.id !== id)
    setData(updatedData)
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">User Name</th>
          <th scope="col">Email</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {currentEditItem && currentEditItem.id === item.id ? (
              <td colSpan="5">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    value={editedValues.name}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="username"
                    value={editedValues.username}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="email"
                    value={editedValues.email}
                    onChange={handleChange}
                  />
                  <button type="submit">Save</button>
                </form>
              </td>
            ) : (
              <>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>
                  <button onClick={() => handleEdit(item.id)} className="btn btn-primary mx-1">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="btn btn-primary mx-1">
                    Delete
                  </button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Crud
