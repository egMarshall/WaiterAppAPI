import path from 'path';
import express from 'express';
import mongoose from 'mongoose';

import { router } from './router';

import dotenv from 'dotenv';
dotenv.config();


mongoose.connect(`mongodb://localhost:${process.env.MONGO_DB_PORT}`)
  .then(() => {
    const app = express();
    const port = process.env.API_PORT || 3001;

    app.use((req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    });

    app.use(express.json());
    app.use(router);
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(()=> console.error('Could not connect to MongoDB...'));




