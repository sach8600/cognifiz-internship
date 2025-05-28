const express = require('express');
const cors = require('cors');
const app = express();
app.get('/', (req, res) => {
    res.send('Welcome to the API server!');
  });
  

app.use(cors());
app.use(express.json());

let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
];

// Get all items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// Add a new item
app.post('/api/items', (req, res) => {
  const newItem = { id: Date.now(), name: req.body.name };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Update an item
app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const item = items.find((item) => item.id == id);
  if (item) {
    item.name = req.body.name;
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

// Delete an item
app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  items = items.filter((item) => item.id != id);
  res.status(204).end();
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
