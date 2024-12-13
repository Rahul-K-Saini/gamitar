import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { config } from './config/index.js';
import { GameStateManager } from './services/GameStateManager.js';
import { SocketManager } from './services/SocketManager.js';

const app = express();
const httpServer = createServer(app);

app.use(cors({
  origin: config.corsOrigin
}));

const io = new Server(httpServer, {
  cors: {
    origin: config.corsOrigin,
    methods: ['GET', 'POST']
  }
});

const gameState = new GameStateManager();
new SocketManager(io, gameState);

httpServer.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});