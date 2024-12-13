export class SocketManager {
    constructor(io, gameState) {
        this.io = io;
        this.gameState = gameState;
        this.setupSocketHandlers();
    }
    setupSocketHandlers() {
        this.io.on('connection', (socket) => {
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
//# sourceMappingURL=SocketManager.js.map