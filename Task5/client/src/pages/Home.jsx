import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  // Fetch items from the API
  useEffect(() => {
    axios.get('http://localhost:5000/api/items').then((response) => {
      setItems(response.data);
    });
  }, []);

  // Add a new item
  const addItem = () => {
    axios.post('http://localhost:5000/api/items', { name: newItem }).then((response) => {
      setItems([...items, response.data]);
      setNewItem('');
    });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Items</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add new item"
      />
      <button onClick={addItem}>Add Item</button>
    </div>
  );
};

export default Home;
