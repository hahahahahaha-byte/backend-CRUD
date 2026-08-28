const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


let items = [
  { id: 1, name: 'Item One', price: 10.99 },
  { id: 2, name: 'Item Two', price: 20.49 },
];


const findItem = (id) => items.find((item) => item.id === parseInt(id));


app.get('/api/items', (req, res) => {
  res.json(items);
});


app.get('/api/items/:id', (req, res) => {
  const item = findItem(req.params.id);
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  res.json(item);
});


app.post('/api/items', (req, res) => {
  const { name, price } = req.body;
  if (!name || price === undefined) {
    return res.status(400).json({ message: 'Name and price are required' });
  }

  const newItem = {
    id: items.length ? items[items.length - 1].id + 1 : 1,
    name,
    price,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});


app.put('/api/items/:id', (req, res) => {
  const item = findItem(req.params.id);
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  const { name, price } = req.body;
  if (name !== undefined) item.name = name;
  if (price !== undefined) item.price = price;

  res.json(item);
});


app.delete('/api/items/:id', (req, res) => {
  const itemIndex = items.findIndex((item) => item.id === parseInt(req.params.id));
  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }

  const deletedItem = items.splice(itemIndex, 1);
  res.json(deletedItem[0]);
});

app.get('/', (req, res) => {
  res.send('Express CRUD API is running. Use /api/items endpoints.');
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});