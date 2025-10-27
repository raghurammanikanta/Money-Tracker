
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Transaction from './models/transaction.js';

const app = express();

// Middleware: Must come BEFORE routes
app.use(cors());
app.use(express.json());

// GET route – send proper JSON
app.get('/api/test', (req, res) => {
  res.json({ message: 'Test OK' });
});

// POST route – receive and return JSON
app.post('/api/transaction', async (req, res) => {
  
  try {
    await mongoose.connect('mongodb+srv://Money:raghuram@cluster0.zirq5yu.mongodb.net/test');
    console.log("connected successfully")
    const{nameFromInput,price,description,datetime}= req.body;
     const transaction = await Transaction.create({nameFromInput,price,description,datetime})
     res.json(transaction)
     console.log(transaction.js)

  } catch (error) {
    console.error(error)

    
  }
  
});

app.get('/api/transaction', async (req, res) => {
  try {
    await  mongoose.connect('mongodb+srv://Money:raghuram@cluster0.zirq5yu.mongodb.net/test');
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start server
app.listen(4040, () => {
  console.log('Server running on http://localhost:4040');
});