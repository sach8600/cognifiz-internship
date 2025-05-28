const express = require('express');
const router = express.Router();

// In-memory data (simulates a database)
let data = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// GET all items
router.get('/items', (req, res) => {
  res.json(data);
});

// GET a single item by ID
router.get('/items/:id', (req, res) => {
  const item = data.find(d => d.id === parseInt(req.params.id));
  item ? res.json(item) : res.status(404).send('Item not found');
});

// POST a new item
router.post('/items', (req, res) => {
  const newItem = { id: data.length + 1, ...req.body };
  data.push(newItem);
  res.status(201).json(newItem);
});

// PUT to update an item
router.put('/items/:id', (req, res) => {
  const index = data.findIndex(d => d.id === parseInt(req.params.id));
  if (index !== -1) {
    data[index] = { id: parseInt(req.params.id), ...req.body };
    res.json(data[index]);
  } else {
    res.status(404).send('Item not found');
  }
});

// DELETE an item
router.delete('/items/:id', (req, res) => {
  const index = data.findIndex(d => d.id === parseInt(req.params.id));
  if (index !== -1) {
    data.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).send('Item not found');
  }
});

module.exports = router;
