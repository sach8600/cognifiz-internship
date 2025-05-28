import React, { useState, useEffect } from 'react';
import { fetchItems, addItem, updateItem, deleteItem } from '../api';

const CRUD = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', email: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchItems().then(res => setItems(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateItem(editingId, form).then(() => {
        setItems(items.map(item => (item.id === editingId ? { ...form, id: editingId } : item)));
        setEditingId(null);
        setForm({ name: '', email: '' });
      });
    } else {
      addItem(form).then(res => setItems([...items, res.data]));
      setForm({ name: '', email: '' });
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({ name: item.name, email: item.email });
  };

  const handleDelete = (id) => {
    deleteItem(id).then(() => setItems(items.filter(item => item.id !== id)));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.email}
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CRUD;
