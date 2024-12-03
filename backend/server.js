import express from 'express';
import productsData from './data/products.js';
import userData from './data/user.js';
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => {
    res.send('API is running.....');
})

app.get('/api/products', (req, res) => {
    res.json(productsData);
    console.log('checkking', productsData.find((p) => p._id === req.params.id))
})

app.get('/api/products/:id', (req, res) => {
    console.log("hitted", req.params.id)
    console.log('checkking', productsData.find((p) => p._id === req.params.id))
    const product = productsData.find((p) => p._id === req.params.id);
    res.json(product);
});


app.listen(port, () => console.log(`Server running on port ${port}`));