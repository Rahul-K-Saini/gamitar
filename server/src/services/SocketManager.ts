import { Server, Socket } from 'socket.io';
import { GameStateManager } from './GameStateManager.js';

export class SocketManager {
  private io: Server;
  private gameState: GameStateManager;

  constructor(io: Server, gameState: GameStateManager) {
    this.io = io;
    this.gameState = gameState;
    this.setupSocketHandlers();
  }

  private setupSocketHandlers(): void {
    this.io.on('connection', (socket: Socket) => {
      console.log(`Player connected: ${socket.id}`);
      
      this.gameState.addPlayer(socket.id);
      
      socket.emit('gameState', {
        grid: this.gameState.getGrid(),
        onlinePlayers: this.gameState.getOnlinePlayersCount(),
        hasPlayed: false
      });

      this.io.emit('playerCount', this.gameState.getOnlinePlayersCount());

      socket.on('updateCell', ({ row, col, value }) => {
        if (this.gameState.updateCell(row, col, value, socket.id)) {
          this.io.emit('gridUpdate', {
            grid: this.gameState.getGrid(),
            lastUpdate: { row, col, value }
          });
        }
      });

      socket.on('disconnect', () => {
        this.gameState.removePlayer(socket.id);
        this.io.emit('playerCount', this.gameState.getOnlinePlayersCount());
        console.log(`Player disconnected: ${socket.id}`);
      });
    });
  }
}