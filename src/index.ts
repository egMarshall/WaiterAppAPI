import path from 'path';
import http from 'node:http';
import express from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io';

import { router } from './router';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

mongoose.connect(`mongodb://localhost:${process.env.MONGO_DB_PORT}`)
  .then(() => {

    const port = process.env.API_PORT || 3001;

    io.on('connection', () => {
      console.log('User connected');
    });

    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

      next();
    });

    app.use(express.json());
    app.use(router);
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(()=> console.error('Could not connect to MongoDB...'));




