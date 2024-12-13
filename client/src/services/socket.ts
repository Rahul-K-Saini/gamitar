import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;
  private listeners: Map<string, ((data?: any) => void)[]> = new Map();

  connect() {
    this.socket = io('https://gamitar-cj8k.onrender.com');

    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    ['gameState', 'gridUpdate', 'playerCount'].forEach(event => {
      this.socket?.on(event, (data) => {
        const eventListeners = this.listeners.get(event);
        if (eventListeners) {
          eventListeners.forEach(listener => listener(data));
        }
      });
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  updateCell(row: number, col: number, value: string) {
    if (this.socket) {
      this.socket.emit('updateCell', { row, col, value });
    }
  }

  on(event: string, callback: (data?: any) => void) {
    const eventListeners = this.listeners.get(event) || [];
    eventListeners.push(callback);
    this.listeners.set(event, eventListeners);
  }

  off(event: string, callback: (data?: any) => void) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      this.listeners.set(
        event,
        eventListeners.filter(listener => listener !== callback)
      );
    }
  }
}

export const socketService = new SocketService();
